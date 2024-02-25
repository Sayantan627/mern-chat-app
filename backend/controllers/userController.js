import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

export const getUsersForSidebar = async (req, res) => {
  const currentUser = req.user._id;
  const users = await User.find({ _id: { $ne: currentUser } }).select(
    "-password"
  ); // all users except current user
  res.status(StatusCodes.OK).json(users);
};
