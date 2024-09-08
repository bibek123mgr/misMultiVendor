const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

const hashData = (data) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(data.toString(), salt);
};

const verifyHash = (data, hash) => {
    return bcrypt.compareSync(data, hash)
}
const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        console.log(error)
    }
}

const cookieOptions = {
    httpOnly: true,      // Makes the cookie inaccessible to JavaScript's Document.cookie API
    secure: true,        // Ensures the cookie is sent only over HTTPS
    sameSite: 'strict',  // Prevents the cookie from being sent along with cross-site requests
    maxAge: 3600000,     // Sets the expiration time (in milliseconds) - 1 hour in this case
    path: '/',           // Specifies the URL path for which the cookie is valid
}


module.exports = { generateToken, generateOtp, hashData, decodeToken, verifyHash, cookieOptions }