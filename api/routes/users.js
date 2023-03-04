const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../utils/error");
const path = require("path");
const multer = require("multer");

//MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//Register a user
router.post("/register", upload.single("image"), async (req, res, next) => {
  try {
    //generate a new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    //create new user
    const url = req.protocol + "://" + req.get("host");
    const newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      age: req.body.age,
      img: url + "/Images/" + req.file.filename,
      isAdmin: req.body.isAdmin,
      isOrg: req.body.isOrg,
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
    const isPasswordCorrect = bcrypt.compareSync(
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
//logout
router.post("/logout", (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
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
});

//delete user
router.delete("/:id", async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401).json("you cant you dont have the auth");
  }
  jwt.verify(token, process.env.JWT, async (err, payload) => {
    if (payload.isAdmin == false) {
      res.status(401).json("You're not an admin");
    } else if (payload.isAdmin) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user deleted");
    }
    if (err) {
      res.status(404).json(err);
    }
  });
});
module.exports = router;
