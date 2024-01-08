const axios = require("axios");

const request = async (apiKey, endpoint, params = {}) => {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    const response = await axios.get(`https://the-one-api.dev/v2${endpoint}`, {
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data from API: ${error.message}`);
  }
};

module.exports = { request };
