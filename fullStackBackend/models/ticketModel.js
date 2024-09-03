// models/ticketModel.js

const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    requestBy: { type: String, required: true },
    subject: { type: String, required: true },
    assignee: {
      type: String, // URL of the uploaded image
      required: false, // Image is optional
    },
    priority: { type: String, required: true },
    status: { type: String, required: true, enum: ["open", "closed"] },
    createDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Ticket", ticketSchema);
