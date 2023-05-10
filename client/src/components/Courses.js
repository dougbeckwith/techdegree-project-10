import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState(null);
  const navigate = useNavigate;

  // get all courses
  useEffect(() => {
    const getCourses = async () => {
      let response;
      try {
        response = await fetch("http://localhost:5000/api/courses");
      } catch (error) {
        console.log(error);
      }
      if (response.status === 200) {
        const { courses } = await response.json();
        setCourses(courses);
      } else if (response.status === 500) {
        navigate("/error");
      }
    };
    getCourses();
  }, [navigate]);
  return (
    <main>
      <div className="wrap main--grid">
        {courses ? (
          courses.map((course, index) => (
            <Link
              key={index}
              className="course--module course--link"
              to={`courses/${course.id}`}>
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          ))
        ) : (
          <p>No courses Available</p>
        )}
        <Link
          className="course--module course--add--module"
          to={"courses/create"}>
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;
