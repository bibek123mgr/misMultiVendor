const bcrypt = require("bcryptjs");
const User = require("../../models/userModel");
const { generateToken, generateOtp, hashData, decodeToken, verifyHash, cookieOptions } = require("../../services/authServices");
const jwt = require('jsonwebtoken');
const cloudinary = require("../../middleware/cloudinary");
class authController {
    async register(req, res) {
        const { name, email, password } = req.body;
        const isEmailExist = await User.findOne({ email })
        if (isEmailExist) {
            return res.status(401).json({ message: 'email already register' })
        }
        const otp = generateOtp()
        const hashedOTP = await hashData(otp)
        const token = jwt.sign({
            name, email, password, otp: hashedOTP
        }, process.env.JWT_SECRET,
            { expiresIn: '5m' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expiresIn: '5m',
            path: '/',
        })
        res.status(200).json({
            message: 'token has send to email verify',
            token,
            otp
        });
    }
    async verifyAccout(req, res) {
        const { otp } = req.body
        const { token } = req.cookies
        console.log(token)
        const decodedPayload = await decodeToken(token)
        if (!decodedPayload) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const { name, email, password } = decodedPayload
        const isValidOTP = verifyHash(otp, decodedPayload.otp)
        if (!isValidOTP) {
            return res.status(400).json({ message: 'invalid otp' })
        }
        const user = await User.create({
            name, email, password
        })
        const Authtoken = await generateToken(user.id)
        res.cookie('auth_token', Authtoken, cookieOptions)
        res.status(201).json({
            message: 'successfully register',
            data: user
        })
    }
    async login(req, res) {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'invalid credentials' })
        }
        const isvalidPassword = await user.matchPassword(password)
        if (!isvalidPassword) {
            res.status(404).json({ message: 'invalid credentials' })
        }
        const token = await generateToken(user.id)
        res.cookie('auth_token', token, cookieOptions)

        res.status(200).json({
            data: user,
        })
    }
    async getMe(req, res) {
        res.status(200).json({
            data: req.user
        })
    }
    async changeProfile(req, res) {
        const file = req.file
        const user = req.user
        if (!file) {
            return res.status(400).json({
                message: 'please send file to update '
            })
        }
        if (user.avatar) {
            await cloudinary.uploader.destroy(user.avatar.public_id)
        }
        const { path, filename } = req.file
        user.avatar.public_id = filename
        user.avatar.url = path
        await user.save()
        res.status(200).json({
            message: 'successfuly update profile',
            data: req.user
        })
    }
    async changePassword(req, res) {
        const user = req.user
        const { password, oldPassword } = req.body
        const isValidPassword = await user.matchPassword(oldPassword)
        if (!isValidPassword) {
            return res.status(401).json({
                message: 'invalid password'
            })
        }
        user.password = password
        await user.save()
        res.status(200).json({
            message: 'successfuly update password',
        })
    }
    async editProfile(req, res) {

    }
    async Logout(req, res) {
        res.cookie('token', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 0,
            path: '/',
        }); res.status(200).json({
            message: 'successfully logout'
        })
    }
}
module.exports = new authController()