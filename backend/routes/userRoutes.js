const express = require("express");
const router = express.Router();

const {signupInfo, loginInfo, getUser, logout} = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const validate = require("../middlewares/validate");
const { userSchema } = require("../schema");

const loginSchema = userSchema.fork(["username"], (schema) => schema.optional());

router.get("/user", authentication, getUser);

router.post("/login", validate(loginSchema), loginInfo);

router.post("/signup", validate(userSchema), signupInfo);

router.post("/logout", logout);

module.exports = router;
