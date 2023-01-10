const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnect");
const userRoute = require("./router/UserRoute");

dotenv.config();
connectDb();
app.use(cookieParser());
app.use("/", userRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
