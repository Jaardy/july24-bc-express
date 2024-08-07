const request = require("supertest");
const app = require("./app");
const { Movie, Show } = require("./models");
const { db } = require("./db/db");
const seed = require("./utils/seedDB");

describe("GET /movies", () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });
  beforeEach(async () => {
    await seed();
  });

  test("succeeds", async () => {
    const { statusCode, headers } = await request(app).get("/movies");

    expect(statusCode).toBe(200);
    expect(headers["content-type"]).toMatch("application/json");
  });

  it("responds with a collection of resources with correct keys", async () => {
    const { body } = await request(app)
      .get("/movies")
      .set("Accept", "application/json");

    expect(Array.isArray(body)).toBe(true);
    expect(
      body.every(
        ({ title, year, id, rating, createdAt, updatedAt, ...otherKeys }) => {
          return (
            title &&
            year &&
            id &&
            rating &&
            createdAt &&
            updatedAt &&
            Object.keys(otherKeys).length === 0
          );
        }
      )
    ).toBe(true);
  });
});
describe("GET /shows", () => {
  beforeAll(async () => {
    await db.sync();
  });
  beforeEach(async () => {
    await seed();
  });

  test("succeeds", async () => {
    const { statusCode, headers } = await request(app).get("/shows");

    expect(statusCode).toBe(200);
    expect(headers["content-type"]).toMatch("application/json");
  });

  it("responds with a collection of resources with correct keys", async () => {
    const { body } = await request(app)
      .get("/shows")
      .set("Accept", "application/json");

    expect(Array.isArray(body)).toBe(true);
    expect(
      body.every(
        ({
          title,
          year,
          id,
          seasons,
          rating,
          createdAt,
          updatedAt,
          ...otherKeys
        }) => {
          return (
            title &&
            year &&
            rating &&
            createdAt &&
            updatedAt &&
            Object.keys(otherKeys).length === 0
          );
        }
      )
    ).toBe(true);
  });
});

describe("GET /shows/:id", () => {
  beforeAll(async () => {
    await db.sync();
  });
  beforeEach(async () => {
    await seed();
  });

  test("succeeds", async () => {
    const response = await request(app).get("/shows/1");

    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toMatch("application/json");
  });
  test("returns a show object", async () => {});
});
