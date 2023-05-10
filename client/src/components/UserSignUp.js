import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const UserSignUp = () => {
  const navigate = useNavigate();
  const { actions } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };

    const credentials = {
      emailAddress,
      password
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(user)
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/users",
        fetchOptions
      );
      if (response.status === 201) {
        console.log(
          `${user.firstName} is successfully signed up and authenticated`
        );
        await actions.signIn(credentials);
        navigate("/");
      }
      if (response.status === 400) {
        const { errors } = await response.json();
        setErrors(errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
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
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <button className="button" type="submit">
            Sign Up
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <Link to={"/signin"}>sign in</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;
