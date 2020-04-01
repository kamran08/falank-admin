'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with blogs
 */
const Blog = use('App/Models/Blog')
const Helpers = use('Helpers')
const Database = use('Database')
class BlogController {
  /**
   * Show a list of all blogs.
   * GET blogs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new blog.
   * GET blogs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new blog.
   * POST blogs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

     async indexBlog({
       request,
       auth
     }) {
       const data = request.all()
       return await Blog.query().orderBy('id', 'desc').paginate(data.page, 20);
     }
     async addBlog({
       request,
       auth
     }) {
       const data = request.all()
       return await Blog.create(data);
     }
     async updateBlog({
       request,
       auth
     }) {
       const data = request.all()
       return await Blog.query().where('id', data.id).update(data);
     }
     async deleteBlog({
       request,
       auth
     }) {
       const data = request.all()
       // return data
       return await Blog.query().where('id', data.id).delete();
     }
 

  async destroy ({ params, request, response }) {
  }
}

module.exports = BlogController
