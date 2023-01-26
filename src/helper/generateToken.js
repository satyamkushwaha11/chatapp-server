const JWT = require("jsonwebtoken");

/**
 * desc : This function is used for generateToken
 * @param {*} id 
 * @returns jsonwebtoken
 */

const GenerateJwtToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

module.exports = GenerateJwtToken;
