const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnect");
const userRoute = require("./router/UserRoute");
const cors = require("cors");

dotenv.config();
connectDb();

app.use(
  cors({
    origin: "http://127.0.0.1:5173/",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/", userRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
