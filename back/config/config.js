const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "react-nodebird",
    host: "127.0.0.1",
    dialect: "mysql",
    port: "3306",
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    port: "3306",
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    port: "3306",
  },
};
