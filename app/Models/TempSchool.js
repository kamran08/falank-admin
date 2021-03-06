'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TempSchool extends Model {
    coach() {
      return this.belongsTo('App/Models/TempSchoolCoach', 'id', 'school_id')
    }
    reviwes() {
      return this.belongsTo('App/Models/TempSchoolCoachReview', 'id', 'school_id')
    }
      

    
}

module.exports = TempSchool
