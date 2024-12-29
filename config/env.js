// This file just loads environment variables from .env into the app
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.PORT)
module.exports = {
    PORT: process.env.PORT || 5000,
    DB_URI: process.env.DB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
};
