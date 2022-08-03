import mongoose from "mongoose";
import validator from 'validator';

const Schema = mongoose.Schema;

const User = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid");
      }
    },
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique:true,
    minlength:10,
    maxlength:10
  },
});

export default mongoose.model("crud_user", User);
