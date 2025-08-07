const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Removes leading/trailing spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Automatically convert email to lowercase
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum password length
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
});

// Create and export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
