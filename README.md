# Lord of the Rings SDK

An SDK for interacting with the Lord of the Rings API. Get movie details, quotes, and more with ease.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Modules](#modules)
  - [Movie](#movie)
  - [Quote](#quote)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the SDK, simply use npm:

```bash
npm install lotr-sdk
```

## Quick Start

To get started, you first need to instantiate the main SDK class:

```javascript
const LOTRSDK = require("lotr-sdk");
const sdk = new LOTRSDK("`<Your-API-Key>`");
```

Now, you can use various methods provided by the SDK.

## Modules

### Movie

The Movie module allows you to retrieve movie-related data:

```javascript
// Fetch all movies
const movies = await sdk.movie.getMovies();

// Fetch a specific movie by its ID
const movie = await sdk.movie.getMovieById("`<movie-id>`");

// Fetch quotes for a specific movie
const quotes = await sdk.movie.getMovieQuotes("`<movie-id>`");

// Fetch a movie's details along with its quotes
const movieWithQuotes = await sdk.movie.getMovieWithQuotes("`<movie-id>`");

// Fetch a random quote from a movie
const randomQuote = await sdk.movie.getRandomMovieQuote("`<movie-id>`");
```

### Quote

The Quote module provides functionality to retrieve quotes:

```javascript
// Fetch all quotes
const quotes = await sdk.quote.getQuotes();

// Fetch a specific quote by its ID
const quote = await sdk.quote.getQuoteById("`<quote-id>`");
```

## Error Handling

If there's any error during the API call, the SDK will throw an error with a descriptive message. Always make sure to handle potential errors when calling SDK methods:

```javascript
try {
  const movie = await sdk.movie.getMovieById("`<movie-id>`");
} catch (error) {
  console.error("Failed to fetch movie:", error.message);
}
```

## Testing

The SDK comes with a suite of tests. Ensure that `axios-mock-adapter` is installed for mocking network requests. Run tests using:

```bash
npm test
```

## Demonstration

To test the SDK locally, you can utilize the provided `demo.js` file. This file demonstrates basic interactions with the SDK.

### Steps:

1. Ensure you have the SDK and its dependencies installed.
2. Navigate to the root directory of the SDK.
3. Replace `YOUR_API_KEY_HERE` in `demo.js` with your actual API key.
4. Run the demonstration using the following command:

```bash
node demo.js
```

This will fetch all movies, details of the first movie, and quotes of the first movie. Ensure you handle the API rate limits and adjust the demo as needed.

## License

This SDK is licensed under the MIT License. See the LICENSE file for details.
