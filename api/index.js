const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const itemRoute = require("./routes/items");
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to MongoDB!"));

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(express.static('Images'));
app.use('/images', express.static('Images'));

//ROUTES

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);
app.use("/api/items", itemRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  console.log("Server listening at port 8800");
});