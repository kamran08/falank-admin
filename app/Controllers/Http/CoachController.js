'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const School = use('App/Models/School')
const SchoolCoach = use('App/Models/SchoolCoach')
const Attribute = use('App/Models/Attribute')
const ReviewImage = use('App/Models/ReviewImage')
const Review = use('App/Models/Review')
const ReviewAttribute = use('App/Models/ReviewAttribute')
const Database = use('Database')
/**
 * Resourceful controller for interacting with coaches
 */
class CoachController {
  /**
   * Show a list of all coaches.
   * GET coaches
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new coach.
   * GET coaches/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new coach.
   * POST coaches
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) { 
  }

  /**
   * Display a single coach.
   * GET coaches/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const legendData = await SchoolCoach.query()
    .where('id', params.id)
    .withCount('allreview')
    .with('topAtrribute.info' )
    .with('school')
   // .withCount('school.questions')
    .with('school', (builder) => {
      builder.withCount('questions')
    })
    .with('avgRating')
   // .with('totalRating')
    .first()
  if (legendData) {
    return response.status(200).json({
      School: legendData

    })
  } else {
    return response.status(404).json({
      'message': 'Coach not found!.'
    })
  }
  }

  /**
   * Render a form to update an existing coach.
   * GET coaches/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update coach details.
   * PUT or PATCH coaches/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a coach with id.
   * DELETE coaches/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
  async getCoachTopReviews ({ response, params }) {
    
    let legendData = await Review.query()
      .where('reviewFor', params.id)
      .where('review_type', 'school')
      .with('reviwer')
      .orderBy('rating', 'DESC')
      .limit(3)
      .fetch()

    return legendData
  }
  async similar_coaches ({ params, request, response, view }) {
    const data = request.all()
    return await ProductQuestion.query()
      .where('product_id', data.product_id)
      .whereNot('id', data.question_id)
      .withCount('answers')
      .orderBy('id', 'desc')
      .paginate(1, 3)
  }
  async recentCitys ({ params, request, response, view }) {
    const data = request.all()
    return await School.query()
      .select( Database.raw('DISTINCT city'))
      .limit(5)
      .fetch()
  }
}

module.exports = CoachController
