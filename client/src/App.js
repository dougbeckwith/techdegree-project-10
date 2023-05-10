import { Route, Routes } from "react-router-dom";

import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UnhandledError from "./components/UnhandledError";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Forbidden from "./components/Forbidden";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UserSignUp from "./components/UserSignUp";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="signin" element={<UserSignIn />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="signout" element={<UserSignOut />} />
        <Route path="error" element={<UnhandledError />} />
        <Route path="forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<PrivateRoute />}>
          <Route path="courses/:id/update" element={<UpdateCourse />} />
          <Route path="courses/create" element={<CreateCourse />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
