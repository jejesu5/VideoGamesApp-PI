require('dotenv').config();
const { Router } = require('express');
const { Videogames } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

const router = Router();


router.get('/:id', async (req, res) => {
    const { id } = req.params;
try {
    if(id.includes('-')){
        let getFromDB = await Videogames.findByPk(id)
        if(!getFromDB) {
            res.status(404).send('videogame not found')
        } else {
            res.status(200).json(getFromDB)
        }
    }
 let getFromAPI = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
 if(!getFromAPI){
    res.status(404).send('videogame not found')
 }
 let game = getFromAPI.data;
 let obj = {
    name: game.name,
    description: game.description,
    released: game.released,
    image: game.background_image,
    rating: game.rating,
    platforms: game.platforms.map(el => el.platform.name),
    genre: game.genres.map(el => el.name)
 }
 res.status(200).json(obj)
} catch (error) {
    res.status(404).send('error en el llamado')
}

})












module.exports = router;


