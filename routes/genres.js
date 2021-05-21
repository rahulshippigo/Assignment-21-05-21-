const express = require('express');
const router = express.Router();
const Genres = require('../models/genres').Genres;
const auth = require('../middlewares/auth');
const validateObjId = require('../middlewares/validateObjectId');
const validatefunc = require('../middlewares/validate');

router.get("/", async(req, res) => {
    const g1 = await Genres.find().sort('name');
    res.send(g1);
});

router.post("/", async(req, res) => {
    const {error} = validatefunc(req.body);
    if(error) 
    return res.status(404).send(error.details[0].message);
    console.log(req.body);

    const genre = new Genres({ name: req.body.name });
     const gen = await genre.save();

    res.send(gen);
});

router.put("/:id", async(req, res) => {
    const{error} = validatefunc(req.body);
    if(error)
    return res.status(404).send(error.details[0].message);

    const g2 = await Genres.findByIdAndUpdate(req.params.id)
    { name: req.body.name }
    if(!g2)
    return res.status(404).send(`Invalid Id: ${req.params.id}`);

    res.send(g2);
});

router.delete("/:id", [auth, validateObjId], async (req, res) => {
    const g3 = await Genres.findByIdAndDelete(req.params.id);
    if(!g3) return res.status(404).send(`Invalid Id: ${req.params.id}`);

    res.send(g3);
});

router.get("/:id", validateObjId, async (req, res) => {
    const g4 = await Genres.findById(req.params.id);
    if(!g4) return res.status(404).send(`Invalid Id: ${req.params.id}`);

    res.send(g4);
});

module.exports = router;