// routes/rickandmortyRoutes.js
import express from 'express';
import { logger } from '../middlewares/logger.middleware.js'
import { getRickAndMortyPersonajes } from '../controllers/rickandmortyController.js';
import { rickandmortyLugares } from '../controllers/rickandmortyLugares.js';
import { getRickAndMortyEpisodios } from '../controllers/rickandmortyEpisodios.js';

const router = express.Router();

// Aplica el middleware de logger a todas las rutas 
router.use(logger);

// Para personajes la  ruta es: /api/rickandmorty/character
router.get('/character', getRickAndMortyPersonajes);

// Para ubicaciones la ruta es: /api/rickandmorty/location
router.get('/location', rickandmortyLugares);

router.get('/episode', getRickAndMortyEpisodios);

export default router;
