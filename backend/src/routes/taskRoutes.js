const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");
const role = require("../middleware/roleMiddleware");

router.get("/", controller.getTasks);
router.post("/", role, controller.createTask);

module.exports = router;
