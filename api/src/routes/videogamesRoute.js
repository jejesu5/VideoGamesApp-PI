require('dotenv').config();
const { Router } = require('express');
const { Videogames } = require('../db');
const { API_KEY } = process.env;

const router = Router();

router.post('/', async (req, res) => {
    const { name, description, plataforms} = req.body
})


module.exports = router;