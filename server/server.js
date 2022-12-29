const express = require('express');
const morgan = require('morgan'); 
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
dotenv.config();

connectDB();
const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1/user", require('./routes/userRoutes'));
app.use("/api/v1/doctor", require('./routes/doctorRoutes'));


const port = process.env.PORT || 8080;

app.listen( port , ()=>{
    console.log(`listening on port ${port}`);
})