import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const UpdateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);
  const [course, setCourse] = useState(null);

  const { authUser } = useContext(UserContext);

  const { id } = useParams();
  const navigate = useNavigate();

  // get course by id
  useEffect(() => {
    const getcourse = async () => {
      let response;

      try {
        response = await fetch(`http://localhost:5000/api/courses/${id}`);
      } catch (error) {
        console.log(error);
      }

      if (response.status === 200) {
        const { course } = await response.json();
        setCourse(course);
        setTitle(course.title);
        setDescription(course.description);
        setEstimatedTime(course.estimatedTime);
        setMaterialsNeeded(course.materialsNeeded);
      } else if (response.status === 400) {
        navigate("/notfound");
      } else if (response.status === 401) {
        navigate("/forbidden");
      } else if (response.status === 500) {
        navigate("/error");
      }
    };

    getcourse();
  }, [id, navigate]);

  // handle update course
  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;

    if (!authUser) {
      console.log("user not signed in");
      return;
    }
    const url = `http://localhost:5000/api/courses/${id}`;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    };

    const encodedCredentials = btoa(
      `${authUser.emailAddress}:${authUser.password}`
    );

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedCredentials}`
      },
      body: JSON.stringify(course)
    };

    try {
      response = await fetch(url, requestOptions);
      if (response.status === 204) {
        navigate(`/courses/${id}`);
      }

      if (response.status === 400 || response.status === 401) {
        const { errors } = await response.json();
        if (errors) {
          setErrors(errors);
        }
      } else {
        setErrors(["Error Could Not Update"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle update course cancel
  const handleCancel = () => {
    navigate("/");
  };
  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>

        {course && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p>By Joe Smith</p>
                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                />
                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  value={materialsNeeded}
                  onChange={(e) =>
                    setMaterialsNeeded(e.target.value)
                  }></textarea>
              </div>
            </div>
            <button className="button" type="submit">
              Update Course
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={handleCancel}>
              Cancel
            </button>
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
          </form>
        )}
      </div>
    </main>
  );
};

export default UpdateCourse;
