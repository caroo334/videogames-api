const gamesIdRouter = require('express').Router();
const axios = require('axios');
const { Videogame } = require('../db')

gamesIdRouter.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;

        if (Number(id)) {
            const { data } = await axios({
                method: 'get',
                url: `${process.env.MY_API_URL}/games/${id}`,
                params: {
                    key: process.env.MY_API_KEY
                }
            });

            res.status(200).json(data)
        } else {
            const gameFromDb = await Videogame.findAll({
                where: {
                    id
                }
            });

            console.log('gameFromDb', gameFromDb[0])

            res.status(200).send({
                name: gameFromDb[0].name,
                slug: gameFromDb[0].slug,
                description_raw: gameFromDb[0].reviews_text_count,
                
            })
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Algo salio mal',
            ...error
        });
    }
});

module.exports = gamesIdRouter;