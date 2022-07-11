const mongoose = require("mongoose");
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB successfully");

    // listening for errors after connecting to db
    mongoose.connection.on("error", (err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

module.exports = { connectToDB };
