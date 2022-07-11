const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: String,
    roles: {
      type: Array,
      default: ["user"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;

  // only hash the password if it is modified or new
  if (!user.isNew || !user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.methods.checkPassword = async function (enteredPassword) {
  const user = this;
  return bcrypt.compare(enteredPassword, user.password);
};

UserSchema.methods.to;

const User = mongoose.model("User", UserSchema);

module.exports = User;
