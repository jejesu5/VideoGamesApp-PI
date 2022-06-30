require('dotenv').config();
const { Router } = require('express');
const { Platforms } = require('../db');
const axios = require('axios');
const e = require('express');
const { API_KEY } = process.env;

const router = Router();

router.get('/', async (req, res) => {
    try {
    let getFromAPI = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=` + 1);
    let AllGamesPlatforms = getFromAPI.data.results.map((el) => el.platforms);
    let Platform = AllGamesPlatforms.flat();
    Platform.forEach(el => {
        Platforms.findOrCreate({
            where: {name: el.platform.name},
            defaults: {
                id: el.platform.id,
                name: el.platform.name
            }
        })
    });
    let PlatformsDB = await Platforms.findAll();
    res.status(202).json(PlatformsDB);
    } catch (error) {
        res.status(404).send(error)
    }
})


module.exports = router;