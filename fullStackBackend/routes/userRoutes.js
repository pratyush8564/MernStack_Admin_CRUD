const express = require("express");
const {register,login, getUserDetails} = require('../controllers/userController');
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/register", register);
router.post("/login",login);
router.get("/userDetails", verifyToken, getUserDetails);

module.exports = router;