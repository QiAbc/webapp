import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: "sh-cdb-jpkfwx1i.sql.tencentcdb.com",
  user: "root",
  password: "zhanghaiduo123",
  database: "webapp",
  port: 25884,
});

export default connection;
