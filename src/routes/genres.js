const genresRouter = require('express').Router();
const axios = require('axios');
const { Videogame, Genres } = require('../db');

const apiGenres = async () => {
    const genresUrl = await axios({
        method: 'get',
        url: `${process.env.MY_API_URL}/genres`,
        params: {
            key: process.env.MY_API_KEY
        }
    });
    const apiInfo = await genresUrl.data.results.map(i => {
        return {
            id: i.id,
            name: i.name,
            slug: i.slug,
            background_image: i.background_image,
        }
    })
    return apiInfo;
};

const getDbGenres = async () => {
    return await Genres.findAll({
        include: {
            model: Videogame,
            attributes: ['slug'], //
            through: {
                attributes: [],
            }
        }
    })
}

const getAllGenres = async () => {
    const sApiGenres = await apiGenres();
    const sgetDbGenres = await getDbGenres();
    const totalInfo = sApiGenres.concat(sgetDbGenres);
    return totalInfo;
}

genresRouter.route('/').get(async (req, res) => {
    const slug = req.query.slug;
    let totalGenres = await getAllGenres();

    console.log('ESTO ME ESTA TRAYENDO GENEROS', totalGenres)

    if (slug) {
        let genresSlug = await totalGenres.filter(g => g.slug.toLowerCase().includes(slug.toLowerCase()));
        genresSlug.length ? res.status(200).send(genresSlug) : res.status(404).send('No existe el genero');
    } else {
        res.status(200).send(totalGenres);
    }
});

module.exports = genresRouter;