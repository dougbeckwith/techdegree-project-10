import React, { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import UserContext from "../context/UserContext";

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  const { id } = useParams();
  const { authUser } = useContext(UserContext);

  const navigate = useNavigate();

  // get course data
  useEffect(() => {
    const getcourse = async () => {
      let response;
      let course;
      try {
        response = await fetch(`http://localhost:5000/api/courses/${id}`);
      } catch (error) {
        console.log(error);
      }
      if (response.status === 200) {
        const data = await response.json();
        course = data.course;
        setCourse(course);
      } else if (response.status === 400) {
        navigate("/notfound");
      } else if (response.status === 500) {
        navigate("/error");
      }
      if (!authUser) {
        setIsOwner(false);
      } else if (course.userId === authUser.id) {
        setIsOwner(true);
      }
    };
    getcourse();
  }, [navigate, authUser, id]);

  // handles delete course
  const handleDelete = async (e) => {
    e.preventDefault();

    let response;

    if (!authUser) {
      console.log("user not signed in");
      return;
    }
    const url = `http://localhost:5000/api/courses/${id}`;

    const encodedCredentials = btoa(
      `${authUser.emailAddress}:${authUser.password}`
    );

    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${encodedCredentials}`
      }
    };

    try {
      response = await fetch(url, requestOptions);

      if (response.status === 204) {
        alert("course deleted!");
        navigate("/");
      }

      if (response.status === 400 || response.status === 401) {
        const { errors } = await response.json();
        setErrors(errors);
      } else {
        setErrors(["Could Not Delete Course"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {isOwner && (
            <>
              <Link className="button" to={`/courses/${id}/update`}>
                Update Course
              </Link>
              <Link
                className="button"
                onClick={(e) => handleDelete(e)}
                to={"/"}>
                Delete Course
              </Link>
            </>
          )}
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
                <ReactMarkdown>{course.description}</ReactMarkdown>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{course.estimatedTime}</p>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                </ul>
              </div>
            </div>
          </form>
          {errors.length ? (
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </main>
  );
};

export default CourseDetail;
