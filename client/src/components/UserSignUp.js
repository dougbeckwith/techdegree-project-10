import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    //  location.href='index.html';"
    e.preventDefault();
    console.log(e);
    console.log(firstName, lastName, emailAddress, password);
    // send credientals to backend
    // if user created login user
    // if error messages show errors ?
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
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
