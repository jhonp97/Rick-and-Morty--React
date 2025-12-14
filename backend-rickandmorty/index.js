// app.js
import 'dotenv/config'; // Carga las variables del .env
import express from 'express';
import cors from 'cors';
import router from './routes/index.routes.js';
import config from './config/config.js';


const app = express();

const corsOptions = {
  origin: ['https://rick-and-morty-react-kdd9.vercel.app', 'http://localhost:3000'], // Tu frontend y tu local
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// app.use(cors());             // Para conectarme sin problemas
app.use(express.json());     // Para procesar los JSON


//ruta por fedecto
app.get("/", (req, res)=>{
    res.status(200).json({msg:"bienvenidos a mi api Rick And Morty"})
})

// la ruta base /api/rickandmorty
app.use('/api/rickandmorty', router);


// Middleware de manejo de errores
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: error.message });
});

app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto ${config.port}`);
});


