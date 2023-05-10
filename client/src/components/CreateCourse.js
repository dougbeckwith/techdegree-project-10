import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  const { authUser } = useContext(UserContext);

  const navigate = useNavigate();

  // handle create course
  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;
    if (!authUser) {
      console.log("user not signed in");
      return;
    }
    const url = "http://localhost:5000/api/courses";

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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedCredentials}`
      },
      body: JSON.stringify(course)
    };

    try {
      response = await fetch(url, requestOptions);

      if (response.status === 201) {
        navigate("/");
      }

      if (response.status === 400 || response.status === 401) {
        const { errors } = await response.json();
        setErrors(errors);
      } else {
        setErrors(["Error Could Not Create Course"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle cancel create course
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
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
        <form>
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
                onChange={(e) => setMaterialsNeeded(e.target.value)}></textarea>
            </div>
          </div>
          <button
            className="button"
            type="submit"
            onClick={(e) => handleSubmit(e)}>
            Create Course
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
