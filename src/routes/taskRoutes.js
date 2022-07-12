const express = require("express");
const router = express.Router();
const {
  isAuthorized,
  requiresAdminRole,
} = require("../middlewares/auth/authMiddlewares");
const {
  create,
  update,
  get,
  getById,
  deleteById,
} = require("../controllers/taskControllers");

router.route("/").get(isAuthorized, get);
router.route("/:id").get(isAuthorized, getById);

router.route("/").post(requiresAdminRole, create);
router.route("/:id").put(requiresAdminRole, update);

router.route("/:id").delete(requiresAdminRole, update);

module.exports = router;
