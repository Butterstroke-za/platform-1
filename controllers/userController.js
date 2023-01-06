const User = require("../models/User.js");
const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')
const response = require('../utils/response')

exports.getUsers = catchAsync(async(req, res, next) => {
    const users = await User.find()
    if(!users){return next(new appError("There was no users found", 404))}  
    response(res,users, 200, "Users retrieved successfully")
    })

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id).populate('appointments');
    if(!user) return next(new appError("There was no user found", 404))

    response(res, user, 200, 'User retrieved successfully')
});

exports.createUser = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body);
    response(res, user, 200, "User created successfully")
});

exports.deactivateUser = catchAsync(async (req, res, next) => {
      const user = await User.findByIdAndDelete(req.params.id);
      if(!user) return next(new appError("Could not find user to remove", 404))

      response(res, user, 204, "User deleted successfully")
  })
  
