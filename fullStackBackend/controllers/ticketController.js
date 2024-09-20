const Ticket = require('../models/ticketModel');
const path = require('path');

const createTicket = async (req, res) => {
  try {
    const { requestBy, subject, priority, status, createDate, dueDate } = req.body;
    const assigneeImage = req.file ? path.basename(req.file.path) : ''; // Get file path from uploaded image

      // Define base URL (this should be your server's URL where images are hosted)
      const baseURL = 'http://localhost:3000/uploads/';

    // Validate required fields
    if (!requestBy || !subject || !priority || !status || !createDate || !dueDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

     // Construct the full image URL
     const assigneeImageURL = assigneeImage ? `${baseURL}${assigneeImage}` : '';

    // Create and save the new ticket
    const newTicket = new Ticket({
      requestBy,
      subject,
      assignee: assigneeImageURL, // Save only image URL
      priority,
      status,
      createDate: new Date(createDate),
      dueDate: new Date(dueDate),
    });

    await newTicket.save();

    res.status(201).json({
      statusCode: 201,
      status: true,
      message: "Ticket created successfully",
      ticket: newTicket,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTickets = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Build the search criteria
    const searchCriteria = search ? { $or: [
      { subject: { $regex: search, $options: 'i' } },
      { requestBy: { $regex: search, $options: 'i' } }
    ] } : {};

    // Fetch tickets with pagination and search
    const totalTickets = await Ticket.find(searchCriteria)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    // Count total tickets for pagination info
    const totalCount = await Ticket.countDocuments(searchCriteria);

    if (totalTickets.length === 0 && totalCount > 0) {
      return res.status(200).json({ data: totalTickets, totalCount }); // Return empty data but with count
    } else if (totalCount === 0) {
      return res.status(404).json({ error: "No Tickets Found" });
    }

    res.status(200).json({
      data: totalTickets,
      totalCount,
      pagination: {
        total: totalCount,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalCount / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


const updateTickets = async (req, res) => {
    try {
      const ticketId = req.params.id;
      const updates = req.body;
  
      console.log('Updating ticket with ID:', ticketId);
      console.log('Updates:', updates);
  
      // If a file was uploaded, process it
      if (req.file) {
        const baseURL = 'http://localhost:3000/uploads/';
        const assigneeImageURL = `${baseURL}${path.basename(req.file.path)}`;
        updates.assignee = assigneeImageURL; // Update with the new image URL
      }
  
      const ticket = await Ticket.findByIdAndUpdate(ticketId, updates, {
        new: true,
      });
  
      if (!ticket) {
        return res.status(400).json({ error: "No ticket found" });
      }
  
      res.status(200).json({
        message: "Ticket updated successfully",
        ticket,
      });
    } catch (error) {
      console.error("Error updating ticket:", error); // Log the error
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const deleteTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await Ticket.findByIdAndDelete(ticketId);

        if(!ticket) {
            return res.status(400).json({ error: "No ticket found" });
        }

        res.status(200).json({
            message: "Ticket deleted succesfully",
        })

    } catch (error) {
      res.status(500).json({ error: "Internal server error"});
    }
  }
  
module.exports = { createTicket, getTickets, updateTickets, deleteTicket };
