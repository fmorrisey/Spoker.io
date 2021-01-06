const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAddressInput(data) {
  let errors = {};

  // Converts empty fields
  data.street1 = !isEmpty(data.street1) ? data.street1 : "";
  data.street2 = !isEmpty(data.street2) ? data.street2 : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.zipCode = !isEmpty(data.zipCode) ? data.zipCode : "";


  //Name Checks
  if (Validator.isEmpty(data.street1)) {
    errors.street1 = "Street Address Required field is required";
  }

  if (Validator.isEmpty(data.street2)) {
    errors.street2 = "Apartment, Unit, or Other field is required";
  }

  // city checks
  if (Validator.isEmpty(data.city)) {
    errors.city = "city field is required";
  }
  
  // state checks
  if (Validator.isEmpty(data.state)) {
    errors.state = "State field is required";
  }

  // country checks
  if (Validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }

  // zipCode checks
  if (Validator.isEmpty(data.zipCode)) {
    errors.zipCode = "zip code field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

};