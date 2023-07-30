import MarvelHelper from "./MarvelHelper";

describe("MarvelHelper", () => {
  describe("genCredentials", () => {
    it("should generate Marvel credentials with publicKey, ts, and hash", () => {
      // Arrange
      const marvelHelper = new MarvelHelper();

      // Act
      const credentials = marvelHelper.genCredentials();

      // Assert
      expect(credentials).toHaveProperty("publicKey");
      expect(credentials).toHaveProperty("ts");
      expect(credentials).toHaveProperty("hash");
    });
  });

  describe("getCharacterById", () => {
    it("should retrieve a Marvel character by ID and return character data", async () => {
      // Arrange
      const marvelHelper = new MarvelHelper();
      const characterId = 1010801;

      // Act
      const character = await marvelHelper.getCharacterById(characterId);

      // Assert
      expect(character.code).toEqual(200);
      expect(character).toHaveProperty("data");
      expect(character.data).toHaveProperty("results");
      expect(character.data.results.length).toEqual(1);
      expect(character.data.results[0].name).toBeDefined();
      expect(character.data.results[0].comics).toBeDefined();
      expect(character.data.results[0].events).toBeDefined();
      expect(character.data.results[0].modified).toBeDefined();
      expect(character.data.results[0].series).toBeDefined();
      expect(character.data.results[0].stories).toBeDefined();
      expect(character.data.results[0].thumbnail.path).toBeDefined();
      expect(character.data.results[0].thumbnail.extension).toBeDefined();
    });
  });

  describe("getListOfCharacters", () => {
    it("should retrieve a list of Marvel characters and return character data", async () => {
      // Arrange
      const marvelHelper = new MarvelHelper();
      const limit = 10;
      const offset = 0;
      const characterName = "Spider";

      // Act
      const characterList = await marvelHelper.getListOfCharacters({
        limit,
        offset,
        characterName,
      });

      // Assert
      expect(characterList.code).toEqual(200);
      expect(characterList).toHaveProperty("data");
      expect(characterList.data).toHaveProperty("results");
      expect(characterList.data.results.length).toBeGreaterThan(5);
      expect(characterList.data.results.length).toEqual(10);
      expect(characterList.data.results[0].name).toBeDefined();
      expect(characterList.data.results[0].thumbnail.path).toBeDefined();
      expect(characterList.data.results[0].thumbnail.extension).toBeDefined();
    });
  });

  describe("getEventOfCharacterById", () => {
    it("should retrieve events associated with a Marvel character by ID and return event data", async () => {
      // Arrange
      const marvelHelper = new MarvelHelper();
      const characterId = 1010801;

      // Act
      const events = await marvelHelper.getEventOfCharacterById(characterId);

      // Assert
      expect(events.code).toEqual(200);
      expect(events).toHaveProperty("data");
      expect(events.data).toHaveProperty("results");
      expect(events.data.results.length).toBeGreaterThanOrEqual(0);
      expect(events.data.results[0].title).toBeDefined();
      expect(events.data.results[0].end).toBeDefined();
      expect(events.data.results[0].start).toBeDefined();
      expect(events.data.results[0].thumbnail).toBeDefined();
      expect(events.data.results[0].thumbnail.extension).toBeDefined();
      expect(events.data.results[0].thumbnail.path).toBeDefined();
    });
  });

  describe("getComicsOfCharacterById", () => {
    it("should retrieve comics associated with a Marvel character by ID and return comic data", async () => {
      // Arrange
      const marvelHelper = new MarvelHelper();
      const characterId = 1010801;

      // Act
      const comics = await marvelHelper.getComicsOfCharacterById(characterId);

      // Assert
      expect(comics.code).toEqual(200);
      expect(comics).toHaveProperty("data");
      expect(comics.data).toHaveProperty("results");
      expect(comics.data.results.length).toBeGreaterThanOrEqual(0);
      expect(comics.data.results[0].title).toBeDefined();
      expect(comics.data.results[0].thumbnail).toBeDefined();
      expect(comics.data.results[0].thumbnail.extension).toBeDefined();
      expect(comics.data.results[0].thumbnail.path).toBeDefined();
    });
  });

  describe("getSeriesOfCharacterById", () => {
    it("should retrieve series associated with a Marvel character by ID and return series data", async () => {
      // Arrange
      const marvelHelper = new MarvelHelper();
      const characterId = 1010801;

      // Act
      const series = await marvelHelper.getSeriesOfCharacterById(characterId);

      // Assert
      expect(series.code).toEqual(200);
      expect(series).toHaveProperty("data");
      expect(series.data).toHaveProperty("results");
      expect(series.data.results.length).toBeGreaterThanOrEqual(0);
      expect(series.data.results[0].title).toBeDefined();
      expect(series.data.results[0].thumbnail).toBeDefined();
      expect(series.data.results[0].thumbnail.extension).toBeDefined();
      expect(series.data.results[0].thumbnail.path).toBeDefined();
    });
  });

  describe("getStoriesOfCharacterById", () => {
    it("should retrieve stories associated with a Marvel character by ID and return story data", async () => {
      // Arrange
      const marvelHelper = new MarvelHelper();
      const characterId = 1010801;

      // Act
      const stories = await marvelHelper.getStoriesOfCharacterById(characterId);

      // Assert
      expect(stories.code).toEqual(200);
      expect(stories).toHaveProperty("data");
      expect(stories.data).toHaveProperty("results");
      expect(stories.data.results.length).toBeGreaterThanOrEqual(0);
      expect(stories.data.results[0].title).toBeDefined();
    });
  });
});
