require('dotenv').config();
const { Router } = require('express');
const { Videogames, Genres } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');
const { Op } = require('sequelize');

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
            genres: game.genres.map(el => el.name),
            platforms: game.platforms.map(el => el.platform.name)

        }
    })
    games.push(game)
  }))
   return games.flat()
}
const getAllVideogamesInDB = async () => {
    let allInDB = await Videogames.findAll({
        include: Genres,
      });
    let allGames = allInDB.map((videogame) => {
        return {
          image: videogame.image,
          name: videogame.name,
          genres: videogame.Genres.map((genre) => genre.name),
          id: videogame.id,
          rating: videogame.rating,
          platforms: videogame.platforms
        };
      });
      return allGames
}

router.get('/', async (req, res) => {
    const name = req.query.name
   try {
    let allVideogames = [];
    if(name) {
        let gamesFromDB = await Videogames.findAll({where: {name: {[Op.iLike]: '%' + name + '%'}, }, include: Genres });
        console.log('gamesfromDB', gamesFromDB)
        let getDBgames;
      if(gamesFromDB){
          getDBgames = gamesFromDB.map((el) => {
            return {
                id: el.id,
                name: el.name,
                description: el.description,
                date: el.date,
                rating: el.rating,
                image: el.image,
                genres: el.Genres.map((el) => el.name),
                platforms: el.platforms
            }
          })
      }
      let gamesFromAPI = await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
      let allAPIGames = gamesFromAPI.data.results;
      let getAPIGames;
      if(gamesFromAPI){
         getAPIGames = allAPIGames.map((game) => {
            return {
              id: game.id,
                name: game.name,
                description: game.description,
                released: game.released ,
                image: game.background_image,
                rating: game.rating,
                platforms: game.platforms?.map(el => el.platform.name),
                 genres: game.genres?.map(el => el.name)
            }
        })
      }
      allVideogames = [...getDBgames, ...getAPIGames].slice(0, 15);
      if(allVideogames.length > 0) {
        return res.status(202).send(allVideogames);
      }
      return res.status(404).send('not videogame found');
    } else {
        let allAPIGames = await getAllVideogames();
        let allDBGames = await getAllVideogamesInDB();
        allVideogames = [...allDBGames, ...allAPIGames]
        return res.status(202).send(allVideogames)
    }
   } catch (error) {
    res.status(404).send('error')
   }
})



router.post('/', async (req, res) => {
    const {name, description, date, rating, platforms, genres, image} = req.body
    if(!name || !description || !platforms) {
        res.status(404).send('Faltan datos obligatorios');}
        try {
        let newVideogame = await Videogames.create({
            name,
            description,
            date,
            rating,
            platforms,
            image
        })
        genres.forEach( async (el) => {
            let genreToAdd = await Genres.findOne({ where: { name: el } });
            await newVideogame.addGenre(genreToAdd);
        })
        console.log(newVideogame)
        res.status(200).json(newVideogame);
        } catch (error) {
        return res.status(404).send("Oops! Something wrong happened. Please try again :)")
        }
    
})


module.exports = router;