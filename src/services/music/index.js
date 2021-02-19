const express = require("express");
const axios = require("axios");
const verify = require("../auth/verifyToken");

const deezerRouter = express.Router();

deezerRouter.get("/songs/:name",verify, async (req, res, next) => {
    var options = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: {q: req.params.name},
        headers: {
          'x-rapidapi-key': '926e98fa6bmsh65faacd416190edp18218fjsn4d11f47dc266',
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          res.send(response.data);
      }).catch(function (error) {
          console.error(error);
      });
});

deezerRouter.get("/album/:title",verify, async (req, res, next) => {
    var options = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/album/'+ req.params.title,
        headers: {
          'x-rapidapi-key': '926e98fa6bmsh65faacd416190edp18218fjsn4d11f47dc266',
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          res.send(response.data);
      }).catch(function (error) {
          console.error(error);
      });
});



module.exports = deezerRouter;