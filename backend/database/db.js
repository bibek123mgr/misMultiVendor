const mongoose = require("mongoose");

const MONGODBURL = process.env.MONGODBURL

if (!MONGODBURL) {
    throw new Error('MONGODBURL environment variable is not defined');
}

async function connectToDatabase() {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log('Already connected to the database.');
            return;
        }

        const connection = await mongoose.connect(MONGODBURL);

        if (connection) {
            console.log('Connected to the database.');
        }
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

module.exports = connectToDatabase;
