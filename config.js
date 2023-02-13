const dotenv = require("dotenv");

let {
  parsed: { PORT, DATABASE_URL, CLIENT_URL, ENV },
} = dotenv.config();

const config = {
  port: PORT,
  dbUrl: DATABASE_URL,
  clientUrl: CLIENT_URL,
  env: ENV,
};

module.exports = config;
