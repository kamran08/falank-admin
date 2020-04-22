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
     if (auth.user) {

     }
     else{
         return response.status(401).json({
            "message": "You are not authenticate user"
         })

     }

         let data = request.all()
         let schools = await TempSchool.query().where('id', data.id).first()
        //  return schools
          schools = JSON.parse(JSON.stringify(schools))

         await TempSchool.query().where('id', data.id).delete()
         delete schools.id
         let coaches = await TempSchoolCoach.query().where('school_id', data.id).first()
          coaches = JSON.parse(JSON.stringify(coaches))
         await TempSchoolCoach.query().where('school_id', data.id).delete()
         let reviews = await TempSchoolCoachReview.query().where('school_id', data.id).first()
         reviews = JSON.parse(JSON.stringify(reviews))
         await TempSchoolCoachReview.query().where('school_id', data.id).delete()
         delete reviews.id
         data.isConfirmed = false;
         let school = await School.create(schools)
         school = JSON.parse(JSON.stringify(school))

            let coachob = {
                'school_id': school.id,
                'name': coaches.name,
                'avg_rating': reviews.rating,
            }
            
         let coa =  await SchoolCoach.create(coachob)
         reviews.school_id = school.id
         let rev = await Review.create(reviews)
         return response.status(200).json({
           "message": "Approved",
           "school": school,
           "coach": coa,
           "review": rev,
         })


  }
 async updateschool ({ request, response,auth }) {


  }
 async deleteschool ({ request, response,auth }) {
        let data = request.all()
        let school = TempSchool.query().where('id', data.id).delete()
         let coaches = await TempSchoolCoach.query().where('school_id', data.id).delete()
         let rev = await TempSchoolCoachReview.query().where('school_id', data.id).delete()
        return response.status(200).json({
        "message": "deleted succefully",
        })


  }

}

module.exports = SchoolController
