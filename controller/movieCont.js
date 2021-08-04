const Movies = require('../model/movie')
const axios = require('axios')

const movieCont = async (req, res) => {
    let searchQuery = req.query.searchQuery;
    const urlMovies = `${MOVIE_API_URL}?api_key=${MOVIE_API_KEY}&page=1&query=${searchQuery}`
    axios.get(urlMovies).then((result) => {
        const movieArray = [];
        result.data.results.forEach(obj => {
          let moviesData  = new Movies( 
            obj.title,
            obj.overview,
            obj.popularity,
            obj.release_date);
            movieArray.push(moviesData);
        });
        res.send(movieArray);
      })
      .catch((err) => {
        res.send(err.message);
      });
  
  }
  
  module.exports = movieCont;