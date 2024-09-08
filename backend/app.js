const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/authMiddleware');

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

const authRoute = require('./routes/auth/authRoute')
const adminProductRoute = require('./routes/admin/productRoute')
const adminCategoryRoute = require('./routes/admin/categoryRoute')
const adminStoreRoute = require('./routes/admin/storeRoute')
const userStoreRoute = require('./routes/user/storeRoute');
const vendorProductRoute = require('./routes/vendor/productRoute')
const userOrderRoute = require('./routes/user/orderRoute')
const globalProductRoute = require('./routes/global/productRoute')
const globalStoreRoute = require('./routes/global/storeRoute')
const vendorOrderRoute = require('./routes/vendor/orderRoute')
const VendorDataService = require('./routes/vendor/dataServiceRoute')
const adminDataService = require('./routes/admin/dataServiceRoute')
const categoryRoute = require('./routes/global/categoryRoute')
const paymentRoute = require('./routes/user/paymentRoute')


app.use('/api/v1/admin',
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo('admin')
);

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/admin', adminProductRoute, adminCategoryRoute, adminStoreRoute, adminDataService)
app.use('/api/v1/user', userStoreRoute, userOrderRoute, paymentRoute)
app.use('/api/v1/vendor', vendorProductRoute, vendorOrderRoute, VendorDataService)
app.use('/api/v1', globalProductRoute, globalStoreRoute, categoryRoute)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal server error',
        error: err.message
    });
});

module.exports = app;