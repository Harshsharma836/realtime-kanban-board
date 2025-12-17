const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");
const role = require("../middleware/roleMiddleware");

router.get("/", controller.getTasks);
router.post("/", role, controller.createTask);
router.put("/:id", role, controller.updateTask);
router.delete("/:id", role, controller.deleteTask);

module.exports = router;
