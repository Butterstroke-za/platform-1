const User = require("../models/User.js");
const appError = require("../utils/appError.js");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync.js");
const dotenv = require("dotenv");
const { promisify } = require("util");

dotenv.config({ path: "../config.env" });

// need a seperate function to create and return a token
exports.login = async (req, res, next) => {
  const { idNumber, password } = req.body;
  if (!idNumber || !password) {
    return next(new appError("Your ID number and password is needed.", 404));
  }

  const user = await User.findOne({ idNumber });
  if (!user || !(await user.checkPassword)) {
    return next(new appError("Incorrect ID number or password", 404));
  }

  const userId = user._id
  const token = await jwt.sign({userId}, process.env.tokenSecret);
  req.user = user;

  res.status(200).json({
    status: "success",
    message: "logged in successfully",
    token,
    data: { user },
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // check if the request has any cookies to it
  if (req.headers.authorization  && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } 

  if(!token){
    return next(new appError("You are not logged in, please log in.", 404))
  }

  const decodedToken = await promisify(jwt.verify)(token, process.env.tokenSecret);

  const user = await User.findById(decodedToken.userId);
  if (!user) {
    return next(new appError("User belonging to this token does not exist anymore", 404));
  }

  req.user = user;
  next();
});

exports.signOut = catchAsync(async (req, res, next) => {
  req.cookies("jwt", "Signed out");
  res.status(200).json({
    status: "success",
    message: "User signed out",
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = jwt.sign(user._id, process.env.tokenSecret, { expiresIn: "10m" });
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 8 * 3600000), 
    // httpOnly: true 
    // secure: true (https)
  })

  res.status(201).json({
    status: "success",
    message: "Your account has been registered.",
    token,
    data: { user },
  });
});
