require('dotenv').config();
const { Router } = require('express');
const { Genres } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;


const router = Router();

router.get('/', async (req, res) => {
    try {
    let dataFromAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    //console.log('Datos API', dataFromAPI.data.results)
    let results = dataFromAPI.data.results;
    results.forEach(el => {
        Genres.findOrCreate({
            where: {name: el.name},
            defaults: {
                name: el.name,
                id: el.id
            }
        })
    });
    let genresDB = await Genres.findAll();
    res.status(200).json(genresDB);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
})


module.exports = router;