'use strict'
const User = use('App/Models/User')
const CoachVideo = use('App/Models/CoachVideo')
const TopHeadline = use('App/Models/TopHeadline')
const Review = use('App/Models/Review')
const Question = use('App/Models/Question')
const Video = use('App/Models/Video')
const Legend = use('App/Models/Legend')
const LegendImage = use('App/Models/LegendImage')
const BusniessHour = use('App/Models/BusniessHour')
const LegendBussniessInfo = use('App/Models/LegendBussniessInfo')
const LegendSchedule = use('App/Models/LegendSchedule')
const Helpers = use('Helpers')
const Database = use('Database')
class AdminController {
  // Legend Profile
  async indexUser ({ auth }) {
    const user_id = await auth.user.id
    return Legend.query().where('user_id', user_id).first()
  }
  async updateUser ({ request, auth }) {
    const data = request.all()
    const user_id = await auth.user.id

    return await Legend.query().where('user_id', user_id).update(data)
  }
  

  // Legend Hours
  async indexHours ({ auth }) {
    const user_id = await auth.user.id
    const legend = await Legend.query().where('user_id', user_id).first()
    return BusniessHour.query().where('legend_id', legend.id).fetch()
  }
  async updateHours ({ request, auth }) {
    let data = request.all()
    console.log(data)
    const user_id = await auth.user.id
    const legend = await Legend.query().where('user_id', user_id).first()
    for (let d of data.hourData) {
      d.legend_id = legend.id
    }
    await BusniessHour.query().where('legend_id', legend.id).delete()
    return await BusniessHour.createMany(data.hourData)
  }
  // Legend Images
  async indexLegendImages ({ auth }) {
    const user_id = await auth.user.id
    const legend = await Legend.query().where('user_id', user_id).first()
    return LegendImage.query().where('legend_id', legend.id).fetch()
  }
  async storeLegendImages ({ request, auth }) {
    const user_id = await auth.user.id
    const legend = await Legend.find(user_id)

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
    let upFile = `https://dashboard.goflank.com/uploads/${name}`
    let ob = {
      url: upFile,
      legend_id: legend.id
    }

    return await LegendImage.create(ob)
  }
  async deleteLegendImages ({ request, auth }) {
    let data = request.all()
    return await LegendImage.query().where('id', data.id).delete()
  }

    // Legend Bussniess
    async indexBussniess ({ auth }) {
      const user_id = await auth.user.id
      return LegendBussniessInfo.query().where('user_id', user_id).fetch()
    }
    async storeBussniess ({ request, auth }) {
      const data = request.all()
      console.log("yes yes yes")
      const user_id = await auth.user.id
      const user = await Legend.query().where('user_id', user_id).first()
      data.user_id = user_id
      data.legend_id = user.id
  
      return await LegendBussniessInfo.create(data)
    }
    async updateBussniess ({ request, auth }) {
      const data = request.all()
      const user_id = await auth.user.id
  
      return await LegendBussniessInfo.query().where('id', data.id).update(data)
    }
    async deleteBussniess ({ request, auth }) {
      const data = request.all()
      const user_id = await auth.user.id
  
      return await LegendBussniessInfo.query().where('id', data.id).delete(data)
    }

      // Legend Schedules
    async indexSchedules ({ auth }) {
      const user_id = await auth.user.id
      return LegendSchedule.query().where('user_id', user_id).orderBy('id','desc').fetch()
    }
    async deleteSchedules ({ request, auth }) {
      const data = request.all()
      const user_id = await auth.user.id

      return await LegendSchedule.query().where('id', data.id).delete();
    }
    // Coach Videos
    async indexCoatchVideos ({ request, auth }) {
      const data = request.all()
      return await CoachVideo.query().orderBy('id','desc').paginate(data.page,20);
    }
    async storeCoatchVideos ({ request, auth }) {
      const data = request.all()
      return await CoachVideo.create(data);
    }
    async updateVideos ({ request, auth }) {
      const data = request.all()
      // return data
      return await CoachVideo.query().where('id', data.id).update(data);
    }
    async deleteCoatchVideos({ request, auth }) {
      const data = request.all()
      // return data
      return await CoachVideo.query().where('id', data.id).delete();
    }



    //  Videos
    async indexVideos ({ request, auth }) {
      const data = request.all()
      return await Video.query().orderBy('id','desc').paginate(data.page,20);
    }
    async addVideo ({ request, auth }) {
      const data = request.all()
      return await Video.create(data);
    }
    async updateVideoList ({ request, auth }) {
      const data = request.all()
      // return data
      return await Video.query().where('id', data.id).update(data);
    }
    async deleteVideos({ request, auth }) {
      const data = request.all()
      // return data
      return await Video.query().where('id', data.id).delete();
    }



    // top Headline

    async indexTopHeadline ({ request, auth }) {
      const data = request.all()
      return await TopHeadline.query().orderBy('id','desc').paginate(data.page,20);
    }
    async storeTopHeadline ({ request, auth }) {
      const data = request.all()
      return await TopHeadline.create(data);
    }
    async updateTopHeadline ({ request, auth }) {
      const data = request.all()
      // return data
      return await TopHeadline.query().where('id', data.id).update(data);
    }
    async deleteTopHeadline({ request, auth }) {
      const data = request.all()
      // return data
      return await TopHeadline.query().where('id', data.id).delete();
    }

    // ReviewList

    async indexReview ({ request, auth }) {
      const data = request.all()
      return await Review.query().orderBy('id','desc').with('legend').with('reviwer').with('school').with('coach').paginate(data.page,20);
    }
    async storeReview ({ request, auth }) {
      const data = request.all()
      return await Review.create(data);
    }
    async updateReview ({ request, auth }) {
      const data = request.all()
      // return data
      return await Review.query().where('id', data.id).update(data);
    }
    async deleteReview({ request, auth }) {
      const data = request.all()
      // return data
      return await Review.query().where('id', data.id).delete();
    }
    // Question List

    async indexQuestion ({ request, auth }) {
      const data = request.all()
      return await Question.query().orderBy('id','desc').with('user').with('school').with('legend').paginate(data.page,20);
    }
    async storeQuestion ({ request, auth }) {
      const data = request.all()
      return await Question.create(data);
    }
    async updateQuestion ({ request, auth }) {
      const data = request.all()
      // return data
      return await Question.query().where('id', data.id).update(data);
    }
    async deleteQuestion({ request, auth }) {
      const data = request.all()
      // return data
      return await Question.query().where('id', data.id).delete();
    }
    // Flank Setting
    // async indexTopHeadline () {
    //   return await TopHeadline.query().orderBy('id','desc').fetch()
    // }
    // async storeTopHeadline ({ request, auth }) {
    //   const data = request.all()
    //   return await TopHeadline.create(data);
    // }
    // async updateTopHeadline ({ request, auth }) {
    //   const data = request.all()
    //   // return data
    //   return await TopHeadline.query().where('id', data.id).update(data);
    // }
    // async deleteTopHeadline({ request, auth }) {
    //   const data = request.all()
    //   // return data
    //   return await TopHeadline.query().where('id', data.id).delete();
    // }
    async indexAlluser({ request, auth }) {
      const data = request.all()
      // return data
      return await User.query().paginate(data.page,20);
    }
}

module.exports = AdminController
