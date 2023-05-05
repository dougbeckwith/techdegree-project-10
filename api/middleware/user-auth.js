"use strict";
const auth = require("basic-auth");
const { User } = require("../models");
const bcrypt = require("bcrypt");

// Middleware to authenticate the request using Basic Auth.
// Sets current user to the request body
exports.authenticateUser = async (req, res, next) => {

  let message; // store the message to display

  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  // BUG Credientials Undefined on post request to create course
  // Working for SIGN IN AND SIGN UP requests
  console.log(credentials); 

  if (credentials) {
    const user = await User.findOne({
      where: { emailAddress: credentials.name }
    });
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);
      if (authenticated) {
        console.log(`Authentication successful for ${user.name}`);
        console.log(user);
        // Store the user on the Request object.
        req.currentUser = user;
      } else {
        message = `Authentication failure for ${user.name}`;
      }
    } else {
      message = `User not found for ${user.name}`;
    }
  } else {
    message = "Auth header not found";
  }
  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};
