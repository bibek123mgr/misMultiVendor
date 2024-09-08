const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'mis',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        public_id: (req, file) => Date.now() + "_" + file.originalname,
    },
});

const upload = multer({ storage: storage });
module.exports = upload;
