const User = require("../models/userModel");

class seeder {
    async adminSeeder(req, res) {
        try {
            const userCount = await User.countDocuments()
            if (userCount <= 0) {
                await User.create({
                    name: 'admin',
                    email: 'admin@gmail.com',
                    password: 'admin',
                    role: 'admin'
                })
                console.log('admin seed successfully')
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = new seeder()