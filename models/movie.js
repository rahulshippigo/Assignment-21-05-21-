const Joi = require('joi');
const Genres = require('./genres');
const mongoose = require('mongoose');

const Movie =  mongoose.model("Movie", new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    },
    numberInStock:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalPrice:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));


function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        numberInStock: Joi.Number().min(0).max(255).required(),
        dailyRentalPrice: Joi.Number().min(0).max(255).required(),
        genres: Joi.objectId().required()
    });
    return schema.validate(movie);
}

exports = {
    Movie,
    validateMovie
} 