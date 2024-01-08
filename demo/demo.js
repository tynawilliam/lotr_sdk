const LOTRSDK = require("../src/lotr-sdk");

const apiKey = "YOUR_API_KEY_HERE"; // Replace with your actual API key for testing
const sdk = new LOTRSDK(apiKey);

(async () => {
  try {
    console.log("Fetching all movies...");
    const movies = await sdk.movie.getMovies();
    console.log("Movies:", movies);

    if (movies.length > 0) {
      const movieId = movies[0].id;
      console.log(`\nFetching details for movie with ID: ${movieId}...`);
      const movie = await sdk.movie.getMovieById(movieId);
      console.log("Movie Details:", movie);

      console.log(`\nFetching quotes for movie with ID: ${movieId}...`);
      const quotes = await sdk.movie.getMovieQuotes(movieId);
      console.log("Quotes:", quotes);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
