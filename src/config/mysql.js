/**
 * Creator: Tang Xiaoji
 * Time: 2017-12-27
 */

const mysql = require('mysql');
const mysqlConfig = require('../config').mysql;

const conn = mysql.createConnection(mysqlConfig);

conn.connect();

module.exports = {
  connection: conn
};
