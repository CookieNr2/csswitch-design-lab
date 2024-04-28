const express = require("express");
const router = express.Router();

const switchConfig = require("../controllers/switchConfig.controller");

router.post("/switch-config", switchConfig.create);
router.get("/switch-config", switchConfig.list);
router.get("/switch-config/:id", switchConfig.detail);
router.patch("/switch-config/:id", switchConfig.update);
router.delete("/switch-config/:id", switchConfig.delete);

module.exports = router;
