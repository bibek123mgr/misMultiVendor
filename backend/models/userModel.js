const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs');
const Role = require('../type/typeDef');



const userSchema = new Schema({
    name: { type: String, required: [true, 'name is required'] },
    email: { type: String, required: [true, 'email is required'] },
    password: String,
    role: {
        type: String,
        enum: [Role.ADMIN, Role.CUSTOMER, Role.VENDOR, Role.MODERATOR],
        default: Role.CUSTOMER
    },
    avatar: {
        public_id: String,
        url: String
    },
    address: String,
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
}, { timestamps: true });

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

userSchema.methods.matchPassword = async function (userPassword) {
    return bcrypt.compareSync(userPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
