const bcrypt = require("bcrypt");

const SALT_ROUND = 10;

const passwordEncrypter = async (plainPassword) => {
  return bcrypt.hash(plainPassword, SALT_ROUND);
};

const passwordAuthenticator = (password, EncrytedPassword) => {
  return bcrypt.compare(password, EncrytedPassword);
};

module.exports = {
  passwordEncrypter,
  passwordAuthenticator,
};
