import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();

  // get course data
  useEffect(() => {
    const getcourse = async () => {
      let response;
      let course;
      try {
        response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        const data = await response.json();
        course = data.course;
      } catch (error) {
        console.log(error);
        return;
      }
      if (response?.status === 200) {
        setCourse(course);
      } else if (response?.status) {
        console.log(`HTTP Response Code: ${response?.status}`);
      }
    };
    getcourse();
  }, []);

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to={`/courses/${courseId}/update`}>
            Update Course
          </Link>
          {/* <Link className="button" to={"courses/1/update"}>
            Delete Course
          </Link> */}
          <a className="button" href="#">
            Delete Course
          </a>
          <Link className="button button-secondary" to={"/"}>
            Return to List
          </Link>
        </div>
      </div>
      {course ? (
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>
                <p>By Joe Smith</p>
                <p>{course.description}</p>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{course.estimatedTime}</p>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <li>{course.materialsNeeded}</li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </main>
  );
};

export default CourseDetail;
