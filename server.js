const express = require('express');
const cors = require('cors');
const app = express();
const weather = require('./data/weather.json');
app.use(cors());
require('dotenv').config();

app.get('/', (req, res) => {
  res.send(weather);
});

class Forecast {
  constructor(data, description) {
    this.data = data;
    this.description = description;
  }
}
app.get('/weather', (req, res) => {
  let latitude = req.query.lat;
  let longitude = req.query.lon;
  let searchQuery = req.query.searchQuery;

  const found = weather.find(element => element.lat === latitude && element.lon === longitude && element.city_name === searchQuery);
  console.log(found);
  const arrOfDays = [];
  found.data.map(item => {
    let descriptionDay = `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
    let weatherDay = new Forecast(item.valid_date, descriptionDay);
    arrOfDays.push(weatherDay);
  });
  res.send(arrOfDays);
});

app.listen(process.env.PORT);
