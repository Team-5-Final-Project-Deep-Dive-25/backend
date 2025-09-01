import { ErrorHandler } from "../utilities/errorHandler.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ErrorHandler(
        "You are not allowed to access this route",
        403,
        "fail"
      );
    }
    next();
  };
};
