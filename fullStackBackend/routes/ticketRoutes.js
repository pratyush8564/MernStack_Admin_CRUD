// routes/ticketRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const { createTicket, getTickets, updateTickets } = require('../controllers/ticketController');

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

router.post('/tickets', upload.single('assigneeImage'), createTicket);
router.get("/tickets", getTickets);
router.patch("/tickets/:id", upload.single('assigneeImage'), updateTickets);

module.exports = router;
