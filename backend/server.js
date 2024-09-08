const app = require('./app');
require('dotenv').config();
const connectToDatabase = require('./database/db');
connectToDatabase()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
