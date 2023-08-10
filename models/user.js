import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exist"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "User name is required"],
    // Adjusted regex for the username
    match: [
      /^(?![_])(?!.*[_]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid! It shouldn't start or end with a dot or underscore.",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);

export default User;
