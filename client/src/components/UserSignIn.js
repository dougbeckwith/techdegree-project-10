import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";

const UserSignIn = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const { actions } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  // handle sign in
  const handleSubmit = async (e) => {
    e.preventDefault();
    let from = "/";

    if (location.state) {
      from = location.state.from;
    }
    const credentials = {
      emailAddress,
      password
    };

    try {
      const { user, errors } = await actions.signIn(credentials);
      if (user) {
        setErrors([]);
        navigate(from);
      }
      if (errors) {
        setErrors(errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle sign in cancel
  const handleCancel = () => {
    navigate("/");
  };
  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
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
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="button"
            type="submit"
            onClick={(e) => handleSubmit(e)}>
            Sign In
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <Link to={"/signup"}>sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
