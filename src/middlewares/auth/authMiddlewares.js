const jwt = require("jsonwebtoken");
const AppError = require("../../utils/custom-app-error");

const validateAuthAndDecodeToken = (headers) => {
  const { authorization } = headers;
  if (authorization && authorization.startsWith("Bearer")) {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } else {
    throw new AppError("invalid authorization", 400);
  }
};

const isAuthorized = (req, res, next) => {
  try {
    validateAuthAndDecodeToken(req.headers) && next();
  } catch (error) {
    next(error);
  }
};

const requiresAdminRole = (req, res, next) => {
  try {
    const decoded = validateAuthAndDecodeToken(req.headers);
    const { roles } = decoded;

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
