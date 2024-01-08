const axios = require("axios");
const Quote = require("../src/modules/quote.js");
const MockAdapter = require("axios-mock-adapter");

const mock = new MockAdapter(axios);
const quote = new Quote("mockApiKey");

describe("Quote module", () => {
  const mockId = "5cd96e05de30eff6ebcce7e9";

  afterEach(() => {
    mock.reset();
  });

  it("fetches a list of quotes", async () => {
    const mockQuotes = [{ id: mockId, quote: "One ring to rule them all." }];
    mock.onGet("https://the-one-api.dev/v2/quote").reply(200, mockQuotes);

    const result = await quote.getQuotes();
    expect(result).toEqual(mockQuotes);
  });

  it("fetches a quote by ID", async () => {
    const mockQuote = { id: mockId, quote: "One ring to rule them all." };
    mock
      .onGet(`https://the-one-api.dev/v2/quote/${mockId}`)
      .reply(200, mockQuote);

    const result = await quote.getQuoteById(mockId);
    expect(result).toEqual(mockQuote);
  });

  it("fetches quotes with specific filters applied", async () => {
    const filters = { character: "Frodo" };
    const mockFilteredQuotes = [
      {
        id: mockId,
        character: "Frodo",
        text: "I wish the Ring had never come to me.",
      },
      {
        id: "5cd96e05de30eff6ebcce7ea",
        character: "Frodo",
        text: "I am not alone.",
      },
    ];

    mock
      .onGet("https://the-one-api.dev/v2/quote", { params: filters })
      .reply(200, mockFilteredQuotes);

    const result = await quote.getQuotes(filters);
    expect(result).toEqual(mockFilteredQuotes);
  });
});
