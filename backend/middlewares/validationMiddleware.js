import User from "../models/UserModel.js";
import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
import mongoose from "mongoose";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        if (errorMessages[0].startsWith("no user")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
  body("fullName").notEmpty().withMessage("full name is required"),
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new BadRequestError("user already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
  body("gender").notEmpty().withMessage("gender is required"),
]);

export const validateLoginInput = withValidationErrors([
  body("username").notEmpty().withMessage("username is required"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateMessageInput = withValidationErrors([
  body("message").notEmpty().withMessage("message is required"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      throw new BadRequestError("invalid MongoDB id");
    }
    const user = await User.findById(value);
    if (!user) {
      throw new NotFoundError(`no user found with id ${value}`);
    }
  }),
]);
