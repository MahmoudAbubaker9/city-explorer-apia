const express = require("express");
const cors = require('cors');
const app = express();
const weather = require('./data/weather.json');
app.use(cors());
require('dotenv').config();

// const cors = require('cors');

class Forecast {
  constructor(value) {
    this.valid_date = value.valid_date;
    this.description = ` ${value.weather.description}`;
  }
}

app.get('/', (req, res) => {
  res.send(weather);
});
app.get('/weather', (req, res) => {

  try {
    let { searchQuery, lat, lon } = req.query;
    let findCity = weather.find(element =>
      element.city_name.toLowerCase() === searchQuery.toLowerCase() ||
      (element.lat === lat && element.lon === lon)
    );
    let forecastArr = findCity.data.map(items => new Forecast(items));
    res.send(forecastArr);
  }
  catch (e) {
    res.status(404).send('City not found. Please enter the correct city name');
  }
});

app.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`));
