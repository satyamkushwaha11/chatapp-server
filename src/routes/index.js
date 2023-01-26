const express = require("express");
const router = express.Router();

const allUserRoutes = require("./user.routes");

router.use("/user", allUserRoutes);



module.exports = router;
