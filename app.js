const express = require('express')
const app = express()
const {Movie, Show} = require('./models')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get('/movies', async (req, res, next) => {
    const movies = await Movie.findAll()
    res.json(movies)
})

module.exports = app