const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECT_DB);
    console.log("connected");
  } catch (error) {
    console.log("no connect");
  }
};

module.exports = connectDb;
