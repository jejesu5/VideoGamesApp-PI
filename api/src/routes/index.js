const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require('./videogamesRoute.js');
const genre = require('./genreRoutes.js');
const videogame = require('./videogameRoute.js');
const platforms = require('./platformsRoute.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogames);

router.use('/genre', genre);

router.use('/videogame', videogame);

router.use('/platforms', platforms);


module.exports = router;
