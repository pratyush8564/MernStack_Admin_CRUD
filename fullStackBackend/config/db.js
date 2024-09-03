const mongoose = require('mongoose');

const connectToMongoDb = async ()=> {
    try {
        await mongoose.connect("mongodb://localhost:27017/fullStack", {

    })
    console.log("Mongodb connected");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

module.exports =  connectToMongoDb ;