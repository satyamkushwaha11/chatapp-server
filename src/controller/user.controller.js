const Joi = require("joi");
const User = require("../models/user.model");
const GenerateJwtToken = require("../helper/generateToken");
const {
  passwordEncrypter,
  passwordAuthenticator,
} = require("../helper/passwordSecurity");

const createUser = async (req, res) => {
  // ----definint the validate schema----
  const validationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    profilePic: Joi.string().allow("null", ""),
  });

  //-------validating------
  let validatedData = validationSchema.validate(req.body);
  if (validatedData.error) {
    return res.status(400).json({
      message: validatedData.error.message || "Bad Request!",
      code: 400,
    });
  } else {
    validatedData = validatedData.value;
  }

  //   --main code -----

  try {
    const condition = {
      email: validatedData.email,
    };

    const existData = await User.findOne({ email: validatedData.email });
    if (existData) {
      res.status(409).send({
        message: "Email already exists",
        code: 409,
      });
    } else {
      const encryptPassword = await passwordEncrypter(validatedData.password);

      const payload = {
        ...validatedData,
        password: encryptPassword,
      };

      const user = await User.create(payload);

      const token = await GenerateJwtToken({ id: user._id });

      res.status(201).send({
        data: user,
        token,
      });

      // const token = GenerateJwtToken()
    }
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

const loginUser = async (req, res) => {
  const validationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  //-------validating------
  let validatedData = validationSchema.validate(req.body);
  if (validatedData.error) {
    return res.status(400).json({
      message: validatedData.error.message || "Bad Request!",
      code: 400,
    });
  } else {
    validatedData = validatedData.value;
  }

  //   --main code -----

  try {
    const condition = {
      email: validatedData.email,
    };

    const userExist = await User.findOne({ email: validatedData.email });
    if (!userExist) {
      res.status(404).send({
        message: "account not found",
        code: 404,
      });
    } else {
      const authPassword = await passwordAuthenticator(
        validatedData.password,
        userExist.password
      );
       if (!authPassword) {
        res.status(401).send({
          message: " email or password is not correct",
          code: 401,
        });
      } else {
        const token = await GenerateJwtToken({ id: userExist._id });
        res.status(201).send({
          data: userExist,
          token,
        });
      }

      // const token = GenerateJwtToken()
    }
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

const getAllUser = async (req, res) => {
  const validationSchema = Joi.object({
    searchData: Joi.string().optional(),
    limit: Joi.string().optional(),
    offset: Joi.string().optional(),
  });

  //-------validating------
  let validatedData = validationSchema.validate(req.query);
  if (validatedData.error) {
    return res.status(400).json({
      message: validatedData.error.message || "Bad Request!",
      code: 400,
    });
  } else {
    validatedData = validatedData.value;
  }

  try {
    const condition = {};
    const allUser = await User.find(condition);
    res.status(200).send({
      data: allUser,
      code: 200,
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

const getUserById = async (req, res) => {
  const validationSchema = Joi.object({
    id: Joi.string().required(),
  });

  //-------validating------
  let validatedData = validationSchema.validate(req.query);
  if (validatedData.error) {
    return res.status(400).json({
      message: validatedData.error.message || "Bad Request!",
      code: 400,
    });
  } else {
    validatedData = validatedData.value;
  }

  try {
    const condition = {
      email: validatedData.email,
    };
    const getUser = await User.findOne(condition);
    res.status(200).send({
      data: getUser,
      code: 200,
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

const updateUserById = (req, res) => {};

const deleteAllUser = (req, res) => {};

const deleteUserById = (req, res) => {};

module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteAllUser,
  deleteUserById,
};
