const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movie');
const Genres = require('../models/gen');
const auth = require('../middlewares/auth');
const validateObjectId = require('../middlewares/validateObjectId')

router.get("/", async(req, res) => {
    const movie = await Movie.find().sort('name');
    res.send(movie);
});

router.post("/", auth, async(req, res) => {
    const genresObj = await Genres.findById(req.body.genresId);
    if(!genresObj)
    return res.status(404).send(`Invalid Genres Id`);

    const { error } = validate(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);

    const movie = new Movie({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalPrice: req.body.dailyRentalPrice,
        genres:{
            _id: genresObj._id,
            name: genresObj.name,
        },
    });

    movie = await movie.save();

        res.send(movie);
});



router.put("/:id", auth, async(req, res) => {
    const genresObj = await Genres.findById(req.body.genresId);
    if(!genresObj)
    return res.status(404).send(`Invalid Genres Id`);

    const { error } = validate(req.body);
    if(error) 
    return res.status(400).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalPrice: req.body.dailyRentalPrice,
        genres: {
            _id: genresObj._id,
            name: genresObj.name,
        },
    });

    if(!movie)
    return res.status(404).send(`Invalid Id`);

    res.send(movie);
});



router.get("/:id", validateObjectId, async(req, res) =>{
    const movie = await Movie.findById(req.params.id);
    if(!movie)
    return res.status(404).send(`Invalid given movie Id`);

    res.send(movie);
});

module.exports = router;