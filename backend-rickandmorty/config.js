// config.js
import 'dotenv/config'; // Carga las variables de entorno del archivo .env

const config = {
  port: process.env.PORT || 5000,
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/rickandmorty', // Ejemplo para MongoDB
  // Agrega otras variables de configuración según necesites
};

export default config;
