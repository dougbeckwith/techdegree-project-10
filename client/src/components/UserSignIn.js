import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const UserSignIn = () => {
  const [emailAddres, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(emailAddres, password);
    // attempt to sign in user
    // if success navigate to /
    // if error handle errors
  };
  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>

        <form>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={emailAddres}
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
          <button className="button button-secondary" type="button">
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
