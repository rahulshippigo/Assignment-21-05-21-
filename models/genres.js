const Joi = require('joi');
const mongoose = require('mongoose');

exports.Genres =  mongoose.model("Genress",new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
}));

exports.validateGenres =  (genres)=> {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
    });
    return schema.validate(genres);
}

// module.exports = Genres;
// module.exports = validateGenres;

// exports = {
//     Genres: Genres,
//     validate: validateGenres
// }