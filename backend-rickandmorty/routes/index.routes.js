// routes/rickandmortyRoutes.js
import express from 'express';
import { logger } from '../middlewares/logger.middleware.js'
import { getRickAndMortyMessage } from '../controllers/rickandmortyController.js';
import { rickandmortyLugares } from '../controllers/rickandmortyLugares.js';

const router = express.Router();

// Aplica el middleware logger a todas las rutas de este router
router.use(logger);

// Para personajes, ruta: /api/rickandmorty/character
router.get('/character', getRickAndMortyMessage);

// Para ubicaciones, ruta: /api/rickandmorty/location
router.get('/location', rickandmortyLugares);

export default router;
