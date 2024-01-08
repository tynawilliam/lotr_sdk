const axios = require("axios");
const { request } = require("../src/utils/request.js");
const MockAdapter = require("axios-mock-adapter");

const mock = new MockAdapter(axios);

describe("request utility", () => {
  it("successfully retrieves data", async () => {
    const endpoint = "/test-endpoint";
    const mockData = { data: "test-data" };

    mock.onGet(`https://the-one-api.dev/v2${endpoint}`).reply(200, mockData);

    const result = await request("mockApiKey", endpoint);
    expect(result).toEqual(mockData);
  });

  it("throws an error when request fails", async () => {
    const endpoint = "/failing-endpoint";

    mock.onGet(`https://the-one-api.dev/v2${endpoint}`).reply(500);

    await expect(request("mockApiKey", endpoint)).rejects.toThrow(
      "Failed to fetch data from API:"
    );
  });
});
