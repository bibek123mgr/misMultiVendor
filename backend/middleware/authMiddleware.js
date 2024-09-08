const jwt = require('jsonwebtoken');
const ErrorHandler = require("../utils/ErrorHandler");
const User = require('../models/userModel');

class authMiddleware {
    async isAuthenticated(req, res, next) {
        const { auth_token } = req.cookies;
        if (!auth_token) {
            return next(new ErrorHandler("Login first to access this route", 401));
        }
        try {
            const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (!user) {
                return next(new ErrorHandler("User not found", 404));
            }
            req.user = user;
            console.log("Authenticated user:", req.user); // Log the user object to verify
            next();
        } catch (error) {
            return next(new ErrorHandler("Invalid token", 401));
        }
    }

    restrictTo(...roles) {
        return (req, res, next) => {
            const userRole = req.user?.role;
            console.log("Roles allowed:", roles);
            console.log("User role:", userRole); // Log the role being checked

            if (!roles.includes(userRole)) {
                return next(new ErrorHandler(`Role ${userRole} is not allowed to access this resource`, 403));
            }
            next();
        }
    }
};

module.exports = new authMiddleware();
