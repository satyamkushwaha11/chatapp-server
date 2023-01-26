const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = () => {
  try {
    mongoose.set('strictQuery', true);
    const conn=mongoose.connect(process.env.DB_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection established.");
  } catch (error) {
    console.error(error,'ooooooooooooooooooo');
    process.exit();
  }
};

module.exports = connectDb;
