'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')


// Home Routes

Route.post('/app/emailSubscription', 'HomeController.storeEmailSubscription')
Route.post('/login', 'HomeController.userLogin').middleware(['guest'])
Route.get('/logout', 'HomeController.logout')

// Profile
Route.get('/app/user', 'AdminController.indexUser')
Route.put('/app/user', 'AdminController.updateUser')

// Hours

Route.get('/app/hours', 'AdminController.indexHours')
Route.put('/app/hours', 'AdminController.updateHours')
// Hours

Route.get('/app/schedules', 'AdminController.indexSchedules')
Route.delete('/app/schedules', 'AdminController.deleteSchedules')
// Bussniess Info

Route.get('/app/bussniess', 'AdminController.indexBussniess')
Route.post('/app/bussniess', 'AdminController.storeBussniess')
Route.put('/app/bussniess', 'AdminController.updateBussniess')
Route.delete('/app/bussniess', 'AdminController.deleteBussniess')


// Imames

Route.get('/app/legend_images', 'AdminController.indexLegendImages')
Route.post('/app/upload-review-file', 'AdminController.storeLegendImages')
Route.delete('/app/legend_images', 'AdminController.deleteLegendImages')
// Upload Photos
//Route.post('/app/upload-review-file', 'HomeController.uploadReviewFile')

// coatch Videos

Route.get('/app/coachVideos', 'AdminController.indexCoatchVideos')
Route.post('/app/coachVideos', 'AdminController.storeCoatchVideos')
Route.put('/app/coachVideos', 'AdminController.updateVideos')
Route.delete('/app/coachVideos', 'AdminController.deleteCoatchVideos')
// Question List

Route.get('/app/questionList', 'AdminController.indexQuestion')
Route.post('/app/questionList', 'AdminController.storeQuestion')
Route.put('/app/questionList', 'AdminController.updateQuestion')
Route.delete('/app/questionList', 'AdminController.deleteQuestion')
// Review List

Route.get('/app/reviewList', 'AdminController.indexReview')
Route.post('/app/reviewList', 'AdminController.storeReview')
Route.put('/app/reviewList', 'AdminController.updateReview')
Route.delete('/app/reviewList', 'AdminController.deleteReview')
// Flank Setting

Route.get('/app/flankSetting', 'AdminController.indexCoatchVideos')
Route.post('/app/flankSetting', 'AdminController.storeCoatchVideos')
Route.put('/app/flankSetting', 'AdminController.updateVideos')
Route.delete('/app/flankSetting', 'AdminController.deleteCoatchVideos')
// top Hedline 

Route.get('/app/topHedline', 'AdminController.indexTopHeadline')
Route.post('/app/topHedline', 'AdminController.storeTopHeadline')
Route.put('/app/topHedline', 'AdminController.updateTopHeadline')
Route.delete('/app/topHedline', 'AdminController.deleteTopHeadline')
//  Videos

Route.get('/app/indexVideos', 'AdminController.indexVideos')
Route.post('/app/addVideo', 'AdminController.addVideo')
Route.post('/app/updateVideoList', 'AdminController.updateVideoList')
Route.post('/app/deleteVideos', 'AdminController.deleteVideos')
//  Blog

Route.get('/app/indexBlog', 'BlogController.indexBlog')
Route.post('/app/addBlog', 'BlogController.addBlog')
Route.post('/app/updateBlog', 'BlogController.updateBlog')
Route.post('/app/deleteBlog', 'BlogController.deleteBlog')


Route.get('/app/indexAddImage', 'AdminController.indexAddImage')
Route.post('/app/updateAddImage', 'AdminController.updateAddImage')
Route.post('/uploadImages', 'HomeController.uploadImages')


Route.get('/app/alluser', 'AdminController.indexAlluser')
Route.get('/app/deshboardData', 'AdminController.deshboardData')



Route.get('app/initdata', 'HomeController.initdata')
Route.any('*', 'NuxtController.render')

