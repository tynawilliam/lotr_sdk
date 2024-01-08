const { request } = require("../utils/request.js");

class Movie {
  constructor(apiKey) {
    if (typeof apiKey !== "string" || apiKey.trim() === "") {
      throw new Error("Invalid API key provided.");
    }
    this.apiKey = apiKey;
  }

  async getMovies(filters = {}) {
    this._validateFilters(filters);
    return request(this.apiKey, "/movie", filters);
  }

  async getMovieById(id, filters = {}) {
    this._validateId(id);
    this._validateFilters(filters);
    return request(this.apiKey, `/movie/${id}`, filters);
  }

  async getMovieQuotes(id, filters = {}) {
    this._validateId(id);
    this._validateFilters(filters);
    return request(this.apiKey, `/movie/${id}/quote`, filters);
  }

  async getMovieWithQuotes(id) {
    const movieDetails = await this.getMovieById(id);
    const movieQuotes = await this.getMovieQuotes(id);

    return {
      ...movieDetails,
      quotes: movieQuotes,
    };
  }

  async getRandomMovieQuote(movieId) {
    this._validateId(movieId);
    const quotes = await this.getMovieQuotes(movieId);
    const randomIdx = Math.floor(Math.random() * quotes.length);

    return quotes[randomIdx];
  }

  _validateId(id) {
    if (typeof id !== "string" || !/[a-fA-F0-9]{24}/.test(id)) {
      throw new Error("Invalid ID format provided.");
    }
  }

  _validateFilters(filters) {
    if (typeof filters !== "object" || Array.isArray(filters)) {
      throw new Error("Invalid filters provided. Filters should be an object.");
    }
  }
}

module.exports = Movie;
