

const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            res.status(500).json({ message: 'Internal server error', error: err.message });
        });
    };
};

module.exports = catchAsync;
