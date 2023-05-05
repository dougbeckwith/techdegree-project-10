import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [materials, setMaterials] = useState("");

  const [validationErrors, setValidationErrors] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;

    const url = "http://localhost:5000/api/courses";
    const course = {
      title,
      description,
      time,
      materials
    };

    const encodedCredentials = `${authUser.emailAddress}:${authUser.password}`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedCredentials}`
      },
      body: JSON.stringify(course)
    };
    try {
      // make post request to api/courses
      // need to send basic auth
      // need to send body with all the course data
      response = await fetch(url, requestOptions);
    } catch (error) {
      setValidationErrors(true);
      console.log(error);
    }
    // handle response
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        {validationErrors && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              <li>Please provide a value for "Title"</li>
              <li>Please provide a value for "Description"</li>
            </ul>
          </div>
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
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}></textarea>
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
