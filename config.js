const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  MongoDB: process.env.MongoDB,
}; 