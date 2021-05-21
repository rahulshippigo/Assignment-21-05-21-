const auth = require('../middlewares/auth');
const { Customer, validate} = require('../models/customers');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get("/", auth, async (req, res) => {
    const customer = await Customer.find().sort("name");
    res.send(customer);
});

router.post("/", auth, async (req, res) => {
    const {error} = validate(req.body);
    if(err) return res.status(400).send(err.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer = await customer.save();

    res.send(customer);
});

router.put("/:id", auth, async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            isGold:req.body.isGold,
            phone: req.body.phone,
        });

        customer = await customer.save();

        res.send(customer);
});

router.put("/:id", auth, async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].details);

    const customer = await Custimer.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        },
    )

    if(!customer)
    return res.status(400).send(`Invalid Customer`);

    res.send(customer);
});


router.delete("/:id", auth, async(req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if(!customer)
    return res.status(404).send(`Invalid Customer`);

    res.send(customer);
});

router.get("/:id", auth, async(req, res) => {
    const customer = await Customer.findById(req.params.id);

    if(!customer)
    return res.status(404).send(`Invalid Customer`);

    res.send(customer);
});

module.exports = router;