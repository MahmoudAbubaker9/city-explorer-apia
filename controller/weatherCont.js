
const axios = require('axios');
require('dotenv').config();
const WEATHERBIT_KEY = process.env.WEATHER_API_KEY;
const WEATHERBIT_URL = process.env.WEATHER_API_URL;
const Forecast = require('../model/weather');

const Cache = require('../helper/cache');
const cacheObj = new Cache();

const weatherCont = async (req, res) => {

  try {
    const requestKey = `${lat}-${lon}`;
    const { lat, lon } = req.query;
    const weatherPar = {
      params: {
        key: WEATHERBIT_KEY,
        lat: lat,
        lon: lon,
      }

    };

    if (cacheObj[requestKey] && (Date.now() - cacheObj[requestKey].timeStamp < 3000)) {
      res.json(cacheObj[requestKey].content);
      console.log('sent from the cache', cacheObj[requestKey]);
    } else {
      const weatherParameter = await axios.get(WEATHERBIT_URL, weatherPar);
      const dataWeather = weatherParameter.data.data.map(element => new Forecast(element));
      res.json(dataWeather);

    };
    cacheObj[requestKey] = {};
    cacheObj[requestKey].content = [];
    cacheObj[requestKey].content = content;
    cacheObj[requestKey].timeStamp = Date.now();
    console.log('sent from the axios request', cacheObj[requestKey]);
    res.send(cacheObj[requestKey].content);

  }
  catch (e) {
    res.status(404).send(e.message);
  }
};

module.exports = weatherCont;
