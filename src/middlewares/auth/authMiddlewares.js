const jwt = require("jsonwebtoken");
const AppError = require("../../utils/custom-app-error");
const User = require("../../models/userModel");

const validateAuthAndDecodeToken = async (headers) => {
  const { authorization } = headers;
  if (authorization && authorization.startsWith("Bearer")) {
    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userExists = await User.findById(decoded.userId);
    if (!userExists) throw new AppError("user does not exist", 401);
    return decoded;
  } else {
    throw new AppError("invalid authorization", 400);
  }
};

const isAuthorized = async (req, res, next) => {
  try {
    const decoded = await validateAuthAndDecodeToken(req.headers);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(error);
  }
};

const requiresAdminRole = async (req, res, next) => {
  try {
    const decoded = await validateAuthAndDecodeToken(req.headers);
    const { userId, roles } = decoded;

    req.userId = userId;

    if (roles.includes("admin")) {
      next();
    } else {
      throw new AppError(
        "user does not have required permissions to access the resource",
        401
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { isAuthorized, requiresAdminRole };
