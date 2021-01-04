const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Converts empty fields
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  password = !isEmpty(data.password) ? data.password : "";
  password2 = !isEmpty(data.password2) ? data.password2 : "";
  role = !isEmpty(data.role) ? data.role : "";

  //Name Checks
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First name field is required";
  }

  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Last name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Password field is required";
  }

  // Password checks
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  // Username checks
  if (Validator.isEmpty(data.role)) {
    errors.role = "role field is required";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };

};