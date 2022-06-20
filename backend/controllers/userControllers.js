const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

/**
 * @description     Authenticate the user and returns a token
 * @route           POST /api/users/login
 * @access          Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(402);
    throw new Error("User doesn't exist!");
  }

  if (await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

/**
 * @description     Register User and returns a token
 * @route           POST /api/users/register
 * @access          Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  // Find user by email in mongodb
  const userExist = await User.findOne({ email: email });

  // If user exist throw error
  if (userExist) {
    res.status(400);
    throw new Error("User already exist!");
  }

  // If user doesnt exist create one
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  // If user is successfully created
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error while creating new user!");
  }
});

/**
 * @description     Auth the user and updates his profile
 * @route           POST /api/users/profile
 * @access          Public
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = { authUser, registerUser, updateUserProfile };
