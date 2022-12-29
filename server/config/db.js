const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () =>{
    try {
        await mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`Mongo DB Connected: ${mongoose.connection.host}`.bgGreen.white);

    } catch (error) {
        console.log(`Mongo DB connection error: ${error}`.bgRed.white);
    }
}

module.exports = connectDB;