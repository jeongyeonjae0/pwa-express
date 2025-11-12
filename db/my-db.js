import mysql from 'mysql2/promise';
import 'dotenv/config';

export default mysql.createPool({
  host: process.env.DB_MYSQL_HOST,
  port: parseInt(process.env.DB_MYSQL_PORT),
  user: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_DB_NAME,
  waitForConnections: (process.env.DB_MYSQL_WAIT_FOR_CONNECTIONS === 'true'),
  connectionLimit: parseInt(process.env.DB_MYSQL_CONNECTION_LIMIT),
  queueLimit: parseInt(process.env.DB_MYSQL_QUEUE_LIMIT)
});
