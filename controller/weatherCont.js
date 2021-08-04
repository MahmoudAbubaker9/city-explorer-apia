
const axios = require('axios');
require('dotenv').config();
const WEATHERBIT_KEY = process.env.WEATHER_API_KEY;
const WEATHERBIT_URL = process.env.WEATHER_API_URL;
const Forecast = require('../model/weather');

const weatherCont = async (req,res) => {

  try {
 const {lat,lon} = req.query;
  const weatherPar={
    params:{
      key:WEATHERBIT_KEY,
      lat:lat,
      lon:lon,
    }
  };
  console.log(WEATHERBIT_URL);
  console.log(weatherPar);
  const weatherParameter = await axios.get(WEATHERBIT_URL,weatherPar);
  const dataWeather = weatherParameter.data.data.map(element => new Forecast(element));
  res.json(dataWeather);

  }
  catch (e) {
    res.status(404).send(e.message);
  }};

module.exports = weatherCont;
