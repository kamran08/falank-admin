/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Review = use('App/Models/Review')
const Reviewimo = use('App/Models/Reviewimo')
const ReviewImage = use('App/Models/ReviewImage')
const ReviewAttribute = use('App/Models/ReviewAttribute')

const Helpers = use('Helpers')
const Database = use('Database')
/**
 * Resourceful controller for interacting with reviews
 */
class ReviewController {
  /**
   * Show a list of all reviews.
   * GET reviews
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new review.
   * GET reviews/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new review.
   * POST reviews
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    let data = request.all()
    const user_id = await auth.user.id
    data.reviwer_id = user_id
    let uploadList = []
    const AttributeInfoAll = data.AttributeInfo
    delete data.AttributeInfo

    const tempUpload = data.uploadList
    delete data.uploadList
    const rdata = await Review.create(data)

    for (let i of tempUpload) {
      let ob = {
        url: i,
        review_id: rdata.id
      }
      uploadList.push(ob)
    }
    await ReviewImage.createMany(uploadList)
    let AttributeInfo = []
    for (let d of AttributeInfoAll) {
      if (d.isPositive == '0' || d.isPositive == '1') {
        let ob = {
          review_id: rdata.id,
          attribute_id: d.id,
          user_id: user_id,
          points: (d.isPositive == '0') ? (d.points * -1) : d.points

        }
        AttributeInfo.push(ob)
      }
    }

    await ReviewAttribute.createMany(AttributeInfo)
    return rdata
  }

  /**
   * Display a single review.
   * GET reviews/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {
    let page = request.input('page') ? request.input('page') : 1
    let str = request.input('str') ? request.input('str') : ''
    let user_id = 0
    if (auth.check()) {
      user_id = await auth.user.id
    }
    let mdata = Review.query().where('reviewFor', params.id)
                                  .with('reviwer')
                                  .with('reviwer', (builder) => builder.withCount('reviews as totalreviewbyuser'))
                                  .with('imos')
                                  .with('imosall', (builder) => {
                                    builder.where('user_id', user_id)
                                  })
                                  .with('images')
    if (str) {
      mdata.where('content', 'LIKE', '%' + str + '%')
    }
    let data = await mdata.orderBy('id', 'desc')
        .paginate(page, 5)

    data = data.toJSON()
    let tempData = JSON.parse(JSON.stringify(data))

    for (let r of tempData.data) {
      if (r.imos == null) {
        r.imos = {
          'id': 0,
          'review_id': 0,
          'cool': 0,
          'funny': 0,
          'useful': 0
        }
      } else {
        if (r.imosall) {
          if (r.imosall.cool == 1) r.imos.acool = true
          if (r.imosall.funny == 1) r.imos.afunny = true
          if (r.imosall.useful == 1) r.imos.auseful = true
        }
      }
    }

    return tempData
  }

  /**
   * Render a form to update an existing review.
   * GET reviews/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update review details.
   * PUT or PATCH reviews/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a review with id.
   * DELETE reviews/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  async uploadReviewFile ({request, response}) {
    const profilePic = request.file('file', {
      types: ['png', 'jpg', 'jpeg'],
      size: '2mb'
    })

    const name = `${new Date().getTime()}` + '.' + profilePic.subtype
    // UPLOAD THE IMAGE TO UPLOAD FOLDER
    await profilePic.move(Helpers.publicPath('uploads'), {
      name: name
    })
    if (!profilePic.moved()) {
      return profilePic.error()
    }

    return response.status(200).json({
      msg: 'Image has been uploaded successfully!',
      file: `/uploads/${name}`
    })
  }

  async stoteReviewImo ({ request, response, auth }) {
    let data = request.all()
    data.user_id = await auth.user.id
    await Reviewimo.findOrCreate(
      { review_id: data.review_id, user_id: data.user_id }

    )

    return await Reviewimo.query().where('review_id', data.review_id).where('user_id', data.user_id).update(data)
  }
  async atrributeConteptData ({ params }) {
    return await Database
    .table('review_attributes')
    .select('attributes.content', 'attributes.points')
    .sum('review_attributes.points as totalPoints')
    .count('review_attributes.id as totalvotes')
    .innerJoin('reviews', function () {
      this
        .on('review_attributes.review_id', 'reviews.id')
    })
    .innerJoin('attributes', function () {
      this
        .on('review_attributes.attribute_id', 'attributes.id')
    })
    .where('reviews.reviewFor', params.id)
    .groupBy('attributes.content')
  }
  async test ({ request, response, auth }) {

  //  return await Database.raw("SELECT `imo` , COUNT(imo) as total FROM `reviewimos` GROUP by `imo`")
  // return await Review.query().select('imo').count('imo as total').groupBy('imo').orderBy('id')
  //  return await Review.query()
  //  .with('imos', (builder) => {
  //   builder.select('imo').count('imo as total')
  // })
  //  .fetch()

  //  return await Review.query()
  //  .with('imos')
  //  .fetch()
  }
}

module.exports = ReviewController
