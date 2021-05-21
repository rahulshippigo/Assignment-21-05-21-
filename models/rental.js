const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false,
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
        }),
        required: true,
    },
    movie: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies'
    }],
    outDate: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    returnedDate: {
        type: Date,
    },
    Fees: {
        type: Number,
        min: 0
    },
});

rentalSchema.statics.lookup = function (customerId, movieId) {
    return rentalSchema.findOne({
        "customer._id": customerId,
        "movie._id": movieId,
    });
};

rentalSchema.methods.return = function(){
    rentalSchema.requiredDate = new Date();
    const dyasonRent = moment().diff(rentalSchema.outDate, "days");
    rentalSchema.Fees = dyasonRent*rentalSchema.movie.dailyRentalPrice;
};

const Rental = mongoose.model("Rental", rentalSchema);


function validateRental(rental) {
    const schema = Joi.object({
        custumerId: Joi.string().required(),
        movieId: Joi.string().required()
    });
    return schema.validate(rental);
}

exports = {
    Rental,
    validateRental
}