class Forecast {
  constructor(value) {
    this.valid_date = `${value.weather.valid_date}`;
    this.description = ` ${value.weather.description}`;
  }
}

module.exports = Forecast;
