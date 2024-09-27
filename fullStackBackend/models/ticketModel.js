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
    priority: { type: String, required: true, enum: ["high","medium", "low"] },
    status: { type: String, required: true, enum: ["open", "closed", "pending"] },
    createDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Ticket", ticketSchema);
