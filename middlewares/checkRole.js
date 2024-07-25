import ErrorHandler from "./error.js";

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler("Access denied.You are not authorized to Access.", 403));
    }
    next();
  };
};

export default checkRole;
