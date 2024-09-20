const express = require("express");
const {register,login, getUserDetails, logout, updateUserDetails} = require('../controllers/userController');
const verifyToken = require("../middlewares/verifyToken");
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    }
  });

  const upload = multer({ storage });

router.post("/register", register);
router.post("/login",login);
router.get("/userDetails", verifyToken, getUserDetails);
router.post("/logout", verifyToken, logout)
router.put("/updateProfile", verifyToken,upload.single('profileImage'), updateUserDetails)

module.exports = router;