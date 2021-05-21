const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model("Customer", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    isGold: {
        type: Boolean,
        default: false //** */
    },
    phone: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 50
    },
}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string.min(5).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.number().min(5).max(50).required
    });
    return schema.validate(customer);
}

exports = {
    Customer,
    validateCustomer
}
