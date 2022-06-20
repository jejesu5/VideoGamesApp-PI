require('dotenv').config();
const { Router } = require('express');
const { Videogames, Genres } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');

const router = Router();

const getAllVideogames = async () => {
    let games = []
    let pages = []
    for(let i = 1; i < 6; i++){
        let url = axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=` + i)
        pages.push(url)
    }
    //Usamos Promise.all para que el llamado a la api sea mas rapido
  await Promise.all(pages).then(response => response.map((el) => {
    let game = el.data.results.map(game => {
        return {
            id: game.id,
            name: game.name,
            released: game.released,
            image: game.background_image,
            rating: game.rating,
            genre: game.genres.map(el => el.name),
            platforms: game.platforms.map(el => el.platform.name)

        }
    })
    games = [...game]
  }))
  //console.log('estos son los games', games)
   return games
}

router.get('/', async (req, res) => {
    let result = await getAllVideogames();
    res.json(result)
})

router.post('/', async (req, res) => {
    const {name, description, date, rating, plataforms, Genres} = req.body
    if(!name || !description || !plataforms) {
        res.status(404).send('Faltan datos obligatorios');}
        try {
        let newVideogame = await Videogames.create({
            name,
            description,
            date,
            rating,
            plataforms
        })
        res.status(200).json(newVideogame);
        } catch (error) {
        return res.status(404).send("error en alguno de los datos")
        }
    
})


module.exports = router;