const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fawn = require('fawn');
fawn.init(mongoose);
const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customers');
const config = require('config');
const auth = require('../middlewares/auth');

router.get("/", auth, async(req, res) => {
    const rental = await Rental.find().sort('outDate');
    res.send(rental);
});


router.post("/", auth, async(req, res) => {
    const { error } = validate(req.body);
    if(error) 
    return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer)
    return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.params.movieId);
    if(!movie)
    return res.status(400).send(`Invalid Movie`);

    if(movie.numberInstock === 0)
    return res.status(400).send(`No Movie in Stock`);

    let rental = new Rental({
        customer:{
            _id: req.body._id,
            name: req.body.name,
            phone: req.body.phone
        },
        movie:{
            _id: movie._id,
            title: movie.title,
            dailtRentalPrice: movie.dailtRentalPrice,
        },
    });
    try{
        new fawn.Task().save('rental', rental).update('movie', {_id:movie._id}).run();
        res.send(rental);
    }catch (error){
        res.status(500).send("Failed");
    }

    res.send(rental);
});

router.get('/:id', auth, async (req, res) => {
    const rental = await Rental.findById(req.params.id);
  
    if (!rental)
      return res.status(404).send('The rental with the given ID was not found.');
  
    res.send(rental);
  });
  
  module.exports = router;
  