const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const Movie = require("../src/modules/movie.js");

const mock = new MockAdapter(axios);
const movie = new Movie("mockApiKey");

describe("Movie module", () => {
  const mockId = "5cd96e05de30eff6ebcce7e9";

  afterEach(() => {
    mock.reset();
  });

  it("fetches a list of movies", async () => {
    const mockMovies = [{ _id: mockId, name: "LOTR" }];
    mock.onGet("https://the-one-api.dev/v2/movie").reply(200, mockMovies);

    const result = await movie.getMovies();
    expect(result).toEqual(mockMovies);
  });

  it("fetches a movie by ID", async () => {
    const mockMovie = { id: mockId, name: "LOTR" };
    mock
      .onGet(`https://the-one-api.dev/v2/movie/${mockId}`)
      .reply(200, mockMovie);

    const result = await movie.getMovieById(mockId);
    expect(result).toEqual(mockMovie);
  });

  it("fetches movie quotes", async () => {
    const mockQuotes = [{ quote: "One ring to rule them all." }];
    mock
      .onGet(`https://the-one-api.dev/v2/movie/${mockId}/quote`)
      .reply(200, mockQuotes);

    const result = await movie.getMovieQuotes(mockId);
    expect(result).toEqual(mockQuotes);
  });

  it("fetches a movie with quotes", async () => {
    const mockMovie = { id: mockId, name: "LOTR" };
    const mockQuotes = [{ quote: "One ring to rule them all." }];
    mock
      .onGet(`https://the-one-api.dev/v2/movie/${mockId}`)
      .reply(200, mockMovie);
    mock
      .onGet(`https://the-one-api.dev/v2/movie/${mockId}/quote`)
      .reply(200, mockQuotes);

    const result = await movie.getMovieWithQuotes(mockId);
    expect(result).toEqual({
      ...mockMovie,
      quotes: mockQuotes,
    });
  });

  it("fetches a random movie quote", async () => {
    const mockQuotes = [
      { quote: "One ring to rule them all." },
      { quote: "I am no man." },
    ];
    mock
      .onGet(`https://the-one-api.dev/v2/movie/${mockId}/quote`)
      .reply(200, mockQuotes);

    const result = await movie.getRandomMovieQuote(mockId);
    expect(mockQuotes).toContainEqual(result);
  });

  it("fetches movies with specific filters applied", async () => {
    const filters = { year: 2001 };
    const mockFilteredMovies = [
      { id: mockId, name: "The Fellowship of the Ring", year: 2001 },
    ];

    mock
      .onGet("https://the-one-api.dev/v2/movie", { params: filters })
      .reply(200, mockFilteredMovies);

    const result = await movie.getMovies(filters);
    expect(result).toEqual(mockFilteredMovies);
  });
});
