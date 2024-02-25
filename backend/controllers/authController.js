import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/passwordUtil.js";
import { createTokenAndSetCookie } from "../utils/tokenUtil.js";
import { UnauthenticatedError } from "../errors/customError.js";

export const register = async (req, res) => {
  const { fullName, username, password, gender } = req.body;
  const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
  const hashedPassword = await hashPassword(password);
  const user = new User({
    fullName,
    username,
    password: hashedPassword,
    gender,
    profilePicture: gender === "male" ? maleProfilePic : femaleProfilePic,
  });

  createTokenAndSetCookie(user._id, res);
  await user.save();
  res.status(StatusCodes.CREATED).json({
    _id: user._id,
    fullName: user.fullName,
    username: user.username,
    profilePicture: user.profilePicture,
  });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    throw new UnauthenticatedError("invalid credentials");
  }

  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("invalid credentials");
  }

  createTokenAndSetCookie(user._id, res);
  res.status(StatusCodes.OK).json({
    _id: user._id,
    fullName: user.fullName,
    username: user.username,
    profilePicture: user.profilePicture,
  });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    maxAge: 0,
  });
  res.status(StatusCodes.OK).json({ msg: "logged out successfully" });
};
