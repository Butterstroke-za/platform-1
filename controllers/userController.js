const User = require("../models/User.js");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      message: "retrieved all users",
      results: users.length,
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "something went wrong",
      error: err,
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: "success",
      message: "user retrieved successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "something went wrong",
      error: err,
    });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(200).json({
      status: "success",
      message: "user created successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: `Something went wrong`,
      error: err,
    });
  }
};


exports.deactivateUser = async (req, res, next) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
  
      res.status(204).json({
        status: "success",
        message: "user deleted successfully",
        data: user,
      });
    } catch (err) {
      res.status(400).json({
        status: "error",
        message: `Something went wrong`,
        error: err,
      });
    }
  };
  
