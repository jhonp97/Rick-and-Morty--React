
import dotenv from 'dotenv';
dotenv.config();

const config = {
  // API_BASE_URL: process.env.API_BASE_URL || 'https://rickandmortyapi.com/api',
  port: process.env.PORT || 5000,
  dbUrl: process.env.DB_URL || 'http://localhost:5000/api/rickandmorty',
  DB_USER: process.env.DB_USER || "user-falso",
  DB_PASS: process.env.DB_PASS || "1234",
  CLUSTER: process.env.CLUSTER || "cluster.mongodb.net",
  DATABASE: process.env.DATABASE || "database"
};

export default config;
// import dotenv from 'dotenv'
// dotenv.config();

// export const PORT = process.env.PORT || 3000
// export const DOMAIN = process.env.DOMAIN || "http://localhost"

// export const DB_USER= process.env.DB_USER || "user-falso";
// export const DB_PASS=process.env.DB_PASS || "1234";
// export const CLUSTER=process.env.CLUSTER || "cluster.mongodb.net";
// export const DATABASE = process.env.DATABASE || "database"