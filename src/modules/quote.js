const { request } = require("../utils/request.js");

class Quote {
  constructor(apiKey) {
    if (typeof apiKey !== "string" || apiKey.trim() === "") {
      throw new Error("Invalid API key provided.");
    }
    this.apiKey = apiKey;
  }

  async getQuotes(filters = {}) {
    this._validateFilters(filters);
    return request(this.apiKey, "/quote", filters);
  }

  async getQuoteById(id, filters = {}) {
    this._validateId(id);
    this._validateFilters(filters);
    return request(this.apiKey, `/quote/${id}`, filters);
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

module.exports = Quote;
