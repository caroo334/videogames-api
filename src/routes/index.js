const { Router } = require('express');
const { gamesRouter } = require('./videogame');
const genresRouter = require('./genres');
const gamesIdRouter = require('./gamesId');
// const searchRouter = require('./search');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/games', gamesRouter);
router.use('/genres', genresRouter);
router.use('/detail', gamesIdRouter);
// router.use('/', searchRouter);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
