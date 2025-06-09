// routes/rickandmortyRoutes.js
import express from 'express';
import { logger } from '../middlewares/logger.middleware.js'
import { getRickAndMortyMessage } from '../controllers/rickandmortyController.js';
import { rickandmortyLugares } from '../controllers/rickandmortyLugares.js';

const router = express.Router();

// Aplica el middleware logger a todas las rutas de este router
router.use(logger);

router.get('/', getRickAndMortyMessage);

router.get('/lugares', rickandmortyLugares);

export default router;
