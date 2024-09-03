const express = require("express");
const cors = require("cors")
const path = require('path');
const multer = require('multer');
const  connectToMongoDb  = require("./config/db")
const userRoutes = require('./routes/userRoutes')
const ticketRoutes = require('./routes/ticketRoutes')


const app = express();
const PORT = 3000;


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

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Connect to MongoDB
connectToMongoDb();

app.use("/api", userRoutes);
app.use("/api", ticketRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to my User Registration and Login API!");
  });

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
