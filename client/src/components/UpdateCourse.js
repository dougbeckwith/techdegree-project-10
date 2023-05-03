import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCourse = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [materials, setMaterials] = useState("");

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
      console.log(course);
      console.log(response);
      if (response?.status === 200) {
        setCourse(course);
        setTitle(course.title);
        setDescription(course.description);
        setTime(course.estimatedTime);
        setMaterials(course.materialsNeeded);
      } else if (response?.status) {
        console.log(`HTTP Response Code: ${response?.status}`);
      }
    };

    getcourse();
  }, []);

  const handleSubmit = (e) => {
    // location.href='index.html';
    e.preventDefault();
    console.log(title, description, time, materials);
  };

  const handleCancel = () => {
    navigate("/");
  };
  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
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
          <button className="button" type="submit">
            Update Course
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

export default UpdateCourse;
