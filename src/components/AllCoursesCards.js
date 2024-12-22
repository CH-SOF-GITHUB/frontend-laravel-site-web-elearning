import '../css/Cards.css'
import React, { useEffect, useState } from 'react'
import { fetchCourses } from '../services/coursesservice'
import CourseItem from './CourseItem'
import { BsFillCollectionFill } from "react-icons/bs";
import CourseReviewCard from './CourseItem';

function AllCoursesCards () {
  const [courseData, setCourseData] = useState([])

  //const apiURL = "http://localhost/e-learning-platform/api/list_courses.php";

  const fetchData = async () => {
    try {
      const res = await fetchCourses()
      setCourseData(res.data)
      console.log('courses: ', courseData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='cards'>
      <h1><BsFillCollectionFill /> Our featured courses</h1>
      <br></br>
      <div className='carddeck'>
        {courseData.map((course, index) => (
          <CourseReviewCard
            key={index}
            description={course.description}
            label={course.title}
            src={course.photo}
            created_at={course.created_at}
            path={'/course_content/' + course.id}
          />
        ))}
      </div>
    </div>
  )
}

export default AllCoursesCards
