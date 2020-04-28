'use strict'
const TempSchool = use('App/Models/TempSchool')
const TempSchoolCoach = use('App/Models/TempSchoolCoach')
const TempSchoolCoachReview = use('App/Models/TempSchoolCoachReview')
const SchoolCoach = use('App/Models/SchoolCoach')
const School = use('App/Models/School')
const Review = use('App/Models/Review')
const Helpers = use('Helpers')
const Database = use('Database')

class SchoolController {

 async indexschool ({ request, response,auth }) {
     const data = request.all()
     return await TempSchool.query().orderBy('id', 'desc').with('reviwes').with('coach').paginate(data.page, 20);
  }
 async storeschool ({ request, response,auth }) {
    //  if (auth.user) {

    //  }
    //  else{
    //      return response.status(401).json({
    //         "message": "You are not authenticate user"
    //      })

    //  }

         let data = request.all()
         let schools = await TempSchool.query().where('id', data.id).first()

         let ob1={
           schoolName: schools.schoolName,
           city: schools.city,
           state: schools.state,
           division: schools.division,
           sport: schools.sport,
           logo: schools.logo,
           isConfirmed: schools.isConfirmed,
         }
         
          // schools = JSON.parse(JSON.stringify(schools))

         
         let coaches = await TempSchoolCoach.query().where('school_id', data.id).first()

         let reviews = await TempSchoolCoachReview.query().where('school_id', data.id).first()
      
          // coaches = JSON.parse(JSON.stringify(coaches))
         
        //  reviews = JSON.parse(JSON.stringify(reviews))
         
         //  school = JSON.parse(JSON.stringify(school))
         
         let school = await School.create(ob1)
            let ob2 = {
              name: coaches.name,
              school_id: school.id,
              avg_rating: reviews.rating,
              totalgood: coaches.totalgood,
              totalbad: coaches.totalbad
            }
         let coa = await SchoolCoach.create(ob2)

         let ob3={
           reviewFor: coa.id,
           reviwer_id: reviews.reviwer_id,
           school_id: school.id,
           review_type: reviews.review_type,
           content: reviews.content,
           rating: reviews.rating,
           is_active: reviews.is_active
         }
         let rev = await Review.create(ob3)


         await TempSchool.query().where('id', data.id).delete()
         await TempSchoolCoach.query().where('school_id', data.id).delete()
         await TempSchoolCoachReview.query().where('school_id', data.id).delete()
         return response.status(200).json({
           "message": "Approved",
           "school": school,
           "coach": coa,
           "review": rev,
         })


  }
 async updateschool ({ request, response,auth }) {

    let data = request.all()
    let coach = data.coach
    let ob1 ={
      id:data.id,
      schoolName: data.schoolName,
      sport: data.sport,
      city: data.city,
      state: data.state,
      division: data.division
    }
    let ob2={
      id: coach.id,
      name: coach.name
    }
    // return {ob1,ob2}
    let school = await TempSchool.query().where('id', data.id).update(ob1)
    let coaches = await TempSchoolCoach.query().where('id', coach.id).update(ob2)
    let d = await TempSchool.query().where('id',data.id).with('reviwes').with('coach').first()

    return response.status(200).json({
      "message": "updated succefully",
      "data":d
    })







  }
 async deleteschool ({ request, response,auth }) {
        let data = request.all()
        let school = await TempSchool.query().where('id', data.id).delete()
         let coaches = await TempSchoolCoach.query().where('school_id', data.id).delete()
         let rev = await TempSchoolCoachReview.query().where('school_id', data.id).delete()
        return response.status(200).json({
        "message": "deleted succefully",
        })


  }

}

module.exports = SchoolController
