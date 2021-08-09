const mongoose = require("mongoose");
const catchAsync = require('../utils/catchAsync');
require('dotenv').config();

const DataBaseUrl = process.env.DATABASE_URL;

const DataBaseConnect = catchAsync(async() => {
    await mongoose.connect(DataBaseUrl, {
        useUnifiedTopology: true, 
        useNewUrlParser: true, 
        useCreateIndex: true
    });
    console.log("DataBase Connected!!");
});

module.exports = DataBaseConnect;