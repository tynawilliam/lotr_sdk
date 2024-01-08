const Movie = require("./modules/movie.js");
const Quote = require("./modules/quote.js");

class LOTRSDK {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.movie = new Movie(apiKey);
    this.quote = new Quote(apiKey);
  }
}

module.exports = LOTRSDK;
