import { NotFoundError, UnauthenticatedError } from "../errors/customError.js";
import { verifyToken } from "../utils/tokenUtil.js";
import User from "../models/UserModel.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId } = verifyToken(token);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new NotFoundError("user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};
