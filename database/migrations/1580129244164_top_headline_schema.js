'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TopHeadlineSchema extends Schema {
  up () {
    this.create('top_headlines', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('top_headlines')
  }
}

module.exports = TopHeadlineSchema
