const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteAllUser,
  deleteUserById,
  loginUser,
} = require("../controller/user.controller");


router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/", deleteAllUser);
router.delete("/:id", deleteUserById);

module.exports = router;
