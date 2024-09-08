const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;  // Provide a fallback value
    error.message = error.message || "Internal Server Error";

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
        const message = Object.values(error.errors || {}).map((value) => {
            // Ensure the value is an object with a message property
            return value.message;
        });
        error = new ErrorHandler(message.join(", "), 400);
    }

    // Handle Mongoose duplicate key errors
    if (error.code === 11000) {
        const message = `Duplicate ${Object.keys(error.keyValue || {}).join(", ")} entered`;
        error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
        success: false,
        error,
        message: error.message,
        stack: error.stack,
    });
};
