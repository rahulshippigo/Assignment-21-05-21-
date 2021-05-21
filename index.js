const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./.env.json')

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.set('tokenSign', config.jwtPrivateKey);

app.use('/api/genre', require('./routes/genres'));
app.use('/api/customer', require('./routes/customer'));
app.use('/api/movie', require('./routes/movies'));
app.use('/api/rental', require('./routes/rental'));
app.use('/api/user', require('./routes/user'));

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect('mongodb://localhost/vidly', mongoOptions)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error(err, 'Could not connect to MongoDB...'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
