// routes/ticketRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const { createTicket, getTickets, updateTickets, deleteTicket, getTicketCounts, getChartData } = require('../controllers/ticketController');
const verifyToken = require('../middlewares/verifyToken');

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
router.get("/tickets", verifyToken, getTickets);
router.patch("/tickets/:id", upload.single('assigneeImage'), updateTickets);
router.delete("/tickets/:id", deleteTicket);
router.get("/tickets/count", verifyToken, getTicketCounts);
router.get("/tickets/chart-data", verifyToken, getChartData);

module.exports = router;
