const express = require("express");
const {
  create,
  update,
  deleteById,
  get,
  getById,
  loginUser,
  signupUser,
} = require("../controllers/userControllers");
const {
  isAuthorized,
  requiresAdminRole,
} = require("../middlewares/auth/authMiddlewares");
const router = express.Router();

router.route("/").get(requiresAdminRole, get);
router.route("/:id").get(isAuthorized, getById);

router.route("/").post(requiresAdminRole, create);
router.route("/:id").put(requiresAdminRole, update);
router.route("/:id").delete(requiresAdminRole, deleteById);

router.route("/login").post(loginUser);
router.route("/signup").post(signupUser);

module.exports = router;
