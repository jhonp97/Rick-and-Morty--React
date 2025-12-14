import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  dbUrl: process.env.DB_URL || 'http://localhost:5000/api/rickandmorty',
  DB_USER: process.env.DB_USER || "user-falso",
  DB_PASS: process.env.DB_PASS || "1234",
  CLUSTER: process.env.CLUSTER || "cluster.mongodb.net",
  DATABASE: process.env.DATABASE || "database"
};

export default config;