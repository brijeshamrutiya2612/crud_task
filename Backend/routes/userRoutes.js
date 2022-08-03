import User from "../module/User.js";
import express from "express";
import expressAsyncHandler from "express-async-handler";

const userForm = express.Router();

///-----------------   Add User -----------------------///

userForm.post(
  "/add",
  expressAsyncHandler(async (req, res) => {
    const newUserData = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      address: req.body.address,
      mobile: req.body.mobile,
    });
    const userData = await newUserData.save();
    res.status(201).send({ message: "New User Data Created", userData });
  })
);

///-----------------   Get All User -----------------------///

// userForm.get(
//   "/get",
//   expressAsyncHandler(async (req, res) => {
//     const users = await User.find();
//     res.send(users);
//   })
// );

///-----------------   Pagination -----------------------///

const PAGE_SIZE = 4;

userForm.get(
  "/get",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const users = await User.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countUser = await User.countDocuments();
    res.send({
      users,
      countUser,
      page,
      pages: Math.ceil(countUser / pageSize),
    });
  })
);

///-----------------   Update User Data -----------------------///

userForm.put(
  "/update/:id",
  expressAsyncHandler(async (req, res, next) => {
    const { firstname, lastname, email, address, mobile } = req.body;
    const userId = req.params.id;
    let users;
    try {
      users = await User.findByIdAndUpdate(userId, {
        firstname,
        lastname,
        email,
        address,
        mobile,
      });
    } catch (err) {
      return console.log(err);
    }
    if (!users) {
      return res.status(500).json({ message: "Unable Update User Data" });
    }
    return res.status(200).json({ users });
  })
);

///-----------------   Get User By Id -----------------------///

userForm.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

///-----------------   Delete User By ID -----------------------///

userForm.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.send({ message: "User Deleted" });
    } else {
      res
        .status(404)
        .send({ message: "Some problems are occured in Deletion" });
    }
  })
);

export default userForm;
