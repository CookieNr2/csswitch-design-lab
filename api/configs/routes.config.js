const express = require("express");
const router = express.Router();

const switchConfigs = require("../controllers/switchConfig.controller");
const users = require("../controllers/users.controller");
const auth = require("../middlewares/auth.middleware");

// Configurations CRUD
router.post("/switch-config", auth.checkAuthOpt, switchConfigs.create);
router.get("/switch-config", auth.checkAuth, switchConfigs.list);
router.get("/switch-config/:id", auth.checkAuth, switchConfigs.detail);
router.patch("/switch-config/:id", auth.checkAuth, switchConfigs.update);
router.delete("/switch-config/:id", auth.checkAuth, switchConfigs.delete);

// Users CRUD
router.post("/users", users.create);
router.get("/my-account", auth.checkAuth, users.profile);
router.patch("/my-account", auth.checkAuth, users.update);
router.post("/login", users.login);
router.delete("/my-account", auth.checkAuth, users.delete);

module.exports = router;
