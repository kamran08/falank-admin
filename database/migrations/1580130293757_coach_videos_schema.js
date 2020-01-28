'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CoachVideosSchema extends Schema {
  up () {
    this.create('coach_videos', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('coach_videos')
  }
}

module.exports = CoachVideosSchema
