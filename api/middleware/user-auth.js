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
  let errors = [];

  if (!credentials.name) {
    errors.push("Please Enter Email Address");
  }
  if (!credentials.pass) {
    errors.push("Please Enter A Password");
  }
  if (credentials) {
    const user = await User.findOne({
      where: { emailAddress: credentials.name }
    });
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);
      if (authenticated) {
        console.log(`Authentication successful for ${credentials.name}`);
        req.currentUser = user;
      } else {
        message = `Authentication failure for ${credentials.name}`;
      }
    } else {
      message = `User not found for ${credentials.name}`;
    }
  } else {
    message = "Auth header not found";
  }
  if (errors.length) {
    res.status(400).json({ errors });
  } else if (message) {
    res.status(401).json({ errors: ["Access Denied"] });
  } else {
    next();
  }
};
