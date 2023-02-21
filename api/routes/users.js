const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require('../utils/error');

//Register a user
router.post("/register", async (req, res, next) => {
  try {
    //generate a new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user

    const newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin,
      isOrg: req.body.isOrg
    });

    //save user send res
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

//Login

router.post("/login", async (req, res, next) => {
  try {
    //find user
    const user = await User.findOne({
      email: req.body.email,
    });
    !user && next(createError(400, "User does not exists!"));
    //validate password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    //JWT AUTH
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, isOrg: user.isOrg },
      process.env.JWT
    );

    const { password, isAdmin, isOrg, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin, isOrg });
  } catch (err) {
    next(err);
  }
});
// get all users

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});
//get a single user
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
})


//delete user
module.exports = router;
