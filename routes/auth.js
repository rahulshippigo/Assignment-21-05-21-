const Joi = require('joi');
const express = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

router.post("/", async(req, res, next) => {
    const {error} = validate(req.body);
    if(err) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send(`Invalid Email or password`);

    const validPassword = await bcrypt.compare(req.body.password);
    if(!validPassword) return res.status(400).send(`Invalid Password`);

    res.send(user.generatetoken());
});

function validate(req){
    const schema = Joi.object({
        email: Joi.string().min(5).nax(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(req);
}

module.exports = router;