const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authentication");
const validate = require("../middlewares/validate");
const { taskSchema } = require("../schema");

const {getTasks, addTask, delTask, editTask, checkTask, searchTask} = require("../controllers/taskController");

//Routes
router.get("/", authentication, getTasks)
router.post("/addTask", authentication, validate(taskSchema), addTask);
router.delete("/delTask/:id", authentication, delTask); 
router.put("/editTask/:id", authentication, validate(taskSchema), editTask);
router.put("/checkTask/:id", authentication, checkTask);
router.get("/search", authentication, searchTask);

 
module.exports = router;
