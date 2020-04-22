'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TempSchool extends Model {
    coach() {
      return this.hasMany('App/Models/TempSchoolCoach', 'id', 'school_id')
    }
    reviwes() {
      return this.hasMany('App/Models/TempSchoolCoachReview', 'id', 'school_id').where('review_type', 'school')
    }
      

    
}

module.exports = TempSchool
