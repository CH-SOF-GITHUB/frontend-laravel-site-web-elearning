import "../css/Cards.css";
import React, { useEffect, useState } from "react";
import { fetchCourses } from "../services/coursesservice";
import { BsFillCollectionFill } from "react-icons/bs";
import CourseReviewCard from "./CourseItem";


function AllCoursesCards() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  //const apiURL = "http://localhost/e-learning-platform/api/list_courses.php";

  const fetchData = async () => {
    try {
      const res = await fetchCourses();
      setCourseData(res.data);
      setLoading(false); // Set loading to false once data is fetched
      console.log("courses: ", res.data); // Log the fetched data
    } catch (error) {
      console.log(error);
      setLoading(false); // Ensure loading is set to false in case of an error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Show CircularProgress if loading is true
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="cards">
      <h1>
        <BsFillCollectionFill /> Our featured courses
      </h1>
      <br />
      <div className="carddeck">
        {courseData.map((course, index) => (
          <CourseReviewCard
            key={index}
            description={course.description}
            label={course.title}
            src={course.photo}
            created_at={course.created_at}
            path={"/course_content/" + course.id}
          />
        ))}
      </div>
    </div>
  );
}

export default AllCoursesCards;
