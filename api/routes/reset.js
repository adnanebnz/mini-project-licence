const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { sendPasswordResetLink } = require("../utils/sendPasswordResetLink");
require("dotenv").config();

router.post("/forgot-password", async (req, res, next) => {
  try {
    const oldUser = await User.findOne({ email: req.body.email });
    if (!oldUser) {
      return next("User Not Exists!!", 404);
    }
    const secret = process.env.JWT + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;
    sendPasswordResetLink(oldUser.email, link);
    console.log(link);
  } catch (error) {
    next(error);
  }
});

router.get("/reset-password/:id/:token", async (req, res, next) => {
  const { id, token } = req.params;
  const oldUser = await User.findById(id);
  if (!oldUser) {
    return next("User Not Exists!!", 404);
  }
  const secret = process.env.JWT + oldUser.password;
  try {
    jwt.verify(token, secret);
  } catch (error) {
    next(error);
  }
});

router.post("/reset-password/:id/:token", async (req, res, next) => {
  const token = req.params.token;
  const id = req.params.id;
  const oldUser = await User.findById(id);
  if (!oldUser) {
    return next("User Not Exists!!", 404);
  }
  const secret = process.env.JWT + oldUser.password;
  try {
    jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    await User.findByIdAndUpdate(id, { password: encryptedPassword });
    res.status(200).json("Password Updated");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
