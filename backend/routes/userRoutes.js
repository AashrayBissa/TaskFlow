const express = require("express");
const router = express.Router();

const {signupInfo, loginInfo, getUser, logout} = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

router.get("/user", authentication, getUser);

router.post("/login", loginInfo);

router.post("/signup", signupInfo);

router.post("/logout", logout);

module.exports = router;