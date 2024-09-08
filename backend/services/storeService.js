const { Store } = require("../models/StoreSchema");


const _findStore = async (req, res) => {
    const { id } = req.params;
    const store = await Store.findById(id);
    if (!store) {
        return res.status(404).json({
            message: 'no store found '
        });
    }
    return store;
}

module.exports = { _findStore }