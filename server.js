const express = require("express");
const cors = require('cors');
const app = express();
const weatherCont = require('./controller/weatherCont');
const movieCont = require('./controller/movieCont');

app.use(cors());
require('dotenv').config();


app.get('/', (req, res) => {
  res.send('BackEnd weather site');
});

app.get('/weather', weatherCont);
app.get('/movie', movieCont);

app.listen(process.env.PORT, () => console.log(`Live on ${process.env.PORT}`));
