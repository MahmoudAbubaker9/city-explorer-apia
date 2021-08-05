const Movies = require('../model/movie')
const axios = require('axios')

const Cache = require('../helper/cache');
const movieObj = new Cache();

const movieCont = async (req, res) => {
    let searchQuery  = req.query.searchQuery;
    let requestKey = `movie-${searchQuery}`;
    
    try {
    if(movieObj[requestKey] && Date.now()-movieObj[requestKey].timeStamp < 3000){
      res.json(movieObj[requestKey]);
      console.log('sent from cache');
    }else{
    const urlMovies = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&page=1&query=${searchQuery}`
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
      });
      movieObj[requestKey] = {};
      movieObj[requestKey].content = [];
      movieObj[requestKey].content = arrOfMovies;
      movieObj[requestKey].timeStamp = Date.now();
      res.send(arrOfMovies);
      console.log('sent from get axios');
    }
  
  }
  catch (e) {
    res.status(404).send(e.message);
  }
}
  module.exports = movieCont;

