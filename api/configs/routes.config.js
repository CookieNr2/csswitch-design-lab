const express = require("express");
const router = express.Router();

const switchConfigs = require("../controllers/switchConfig.controller");
const colors = require("../controllers/colors.controller");
const switchParts = require("../controllers/switchParts.controller");
const users = require("../controllers/users.controller");
const orders = require("../controllers/orders.controller");
const auth = require("../middlewares/auth.middleware");

// Configurations CRUD
router.post("/switch-config", auth.checkAuthOpt, switchConfigs.create);
router.get("/popular-configs", switchConfigs.popular);
router.get("/switch-config", auth.checkAuth, switchConfigs.list);
router.get("/switch-config/:id", auth.checkAuth, switchConfigs.detail);
router.patch("/switch-config/:id", auth.checkAuth, switchConfigs.update);
router.delete("/switch-config/:id", auth.checkAuth, switchConfigs.delete);

// Parts CRUD
router.get("/switch-parts", switchParts.list);

// Colors CRUD
router.get("/colors", colors.list);

// Users CRUD
router.post("/users", users.create);
router.get("/my-account", auth.checkAuth, users.profile);
router.patch("/my-account", auth.checkAuth, users.update);
router.post("/login", users.login);
router.delete("/my-account", auth.checkAuth, users.delete);

// Orders CRUD
router.post("/orders", auth.checkAuthOpt, orders.create);
// router.get("/orders", auth.checkAuth, orders.list);
// router.get("/orders/:id", auth.checkAuth, orders.detail);

module.exports = router;
