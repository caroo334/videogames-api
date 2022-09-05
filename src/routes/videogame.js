const gamesRouter = require('express').Router();
const axios = require('axios');
const { Videogame, Genres } = require('../db');


const getDbInfo = async (search, genres) => {
    try {
        if (search) {
            return await Videogame.findAll({
                where: {
                    name: search
                },
                include: {
                    model: Genres, //si no incluye en genero nunca me va a traer el juego con el genro
                    attributes: ['slug'], // que atributos me quiero traer del genero
                    through: {
                        attributes: [],
                    }
                }
            })
        }

        return await Videogame.findAll({
            include: {
                model: Genres,
                attributes: ['slug'],
                through: {
                    attributes: [],
                }
            }
        })
    } catch (error) {
        console.log('Error mijito', error)
    }
} // Esta Funcion me trae la informacion de la base de datos.

const games = async (search, genres) => {
    const gamesUrl = await axios({
        method: "get",
        url: `${process.env.MY_API_URL}/games`,
        params: {
            key: process.env.MY_API_KEY,
            page_size: 100,
            genres,
            search
        }
    }); // Esto me trae la API

    const apiInfo = await gamesUrl.data.results.map(g => {
        return {
            name: g.name,
            slug: g.slug,
            background_image: g.background_image,
            rating: g.rating,
            rating_top: g.rating_top,
            reviews_text_count: g.reviews_text_count,
            id: g.id,
            genres: g.genres
        };
    });

    return apiInfo;
} // Esta Funcion me trae la informacion de la api

const getAllVG = async (search, genres) => {
    /* 
   Esta funcion tiene que hacer dos cosas:
       - Traer todos los juegos que tenemos en nuestra base de datos local.
       - Traer todos los juegos desde la api de rawg
   */

    const dbInfo = await getDbInfo(search, genres);
    const apInfo = await games(search, genres);

    let infoTotal = apInfo;;
    if (dbInfo) {
        infoTotal = apInfo.concat(dbInfo);
    }

    return infoTotal;
}

gamesRouter.route('/').get(async (req, res) => {
    /* 
    En este endpoint tenemos que filtrar por:
        - Genero
        - Nombre (O sea, realizar busqueda)
    */
    const { search, genres } = req.query;

    try {
        const videogameTotal = await getAllVG(search, genres);
        console.log('videogameTotal', videogameTotal)

        res.status(200).json(videogameTotal);
    } catch (error) {
        res.status(404).json({
            msg: 'No esta el Juego',
            error
        })
    }
}).post(async (req, res) => {
    try {
        const { name, img, rating, detail, reviews } = req.body;

        console.log(req.body)

        const gamesDb = await Videogame.create({
            name,
            background_image: img,
            rating,
            reviews_text_count: reviews,
            detail
        })

        console.log('gamesDb', gamesDb)

        res.status(200).json({
            msj: 'Todo perfecto!'
        })
    } catch (error) {
        res.status(500).json({
            msj: 'Algo fallo',
            error
        })
    }
});

module.exports = {
    gamesRouter,
}
