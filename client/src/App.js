import { useEffect, useState } from "react";
function App() {
  const [courses, setCourses] = useState(null);
  // call api to get all courses

  useEffect(() => {
    const getCourses = async () => {
      const response = await fetch("http://localhost:5000/api/courses");
      const { courses } = await response.json();
      console.log(courses);
      setCourses(courses);
    };
    getCourses();
  }, []);
  return (
    <div>
      {courses ? (
        <div>
          <h1>Available Courses</h1>
          <ul>
            {courses.map((course, index) => (
              <li key={index}>{course.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No courses Available</p>
      )}
    </div>
  );
}

export default App;
