
const request = require('supertest');
const app = require('./app');
const { Movie, Show } = require('./models');
const { db } = require('./db/db');
const seed = require('./utils/seedDB');

// jest.mock('../middleware/oidcAuth');

// describe("app", () => {
//     describe("GET /", () => {
//         beforeAll(async() => {
//             await db.sync()
//         })
//       test("succeeds", async () => {
//         const { statusCode } = await request(app).get("/movies");
  
//         expect(statusCode).toBe(200);
//       });
  
//       test("response body contains text/html", async () => {
//         const { headers } = await request(app).get("/movies");
  
//         expect(headers["content-type"]).toMatch("application/json");
//       });
  
//     });
//   });

  describe('GET /movies', () => {
    beforeAll(async () => {
        await db.sync()
    })
    beforeEach(async () => {
        await seed()
    })

         test("succeeds", async () => {
        const { statusCode, headers } = await request(app).get("/movies");
  
        expect(statusCode).toBe(200);
        expect(headers["content-type"]).toMatch("application/json");
      });

    it('responds with a collection of resources', async () => {
      const {body} = await request(app)
        .get('/movies')
        .set('Accept', 'application/json')
       
        console.log(body)
        expect(Array.isArray(body)).toBe(true)
        expect(
                  body.every(
                    ({ title, year, rating, createdAt, updatedAt, ...otherKeys }) => {
                        console.log(title, year, rating, createdAt, otherKeys)
                        return title && year && rating && createdAt && updatedAt && Object.keys(otherKeys).length ===0}
                  )
                ).toBe(true);

        //   try {
        //     expect(Array.isArray(resources)).toBe(true);
        //     expect(
        //       resources.every(
        //         ({ title, year, rating, createdAt, updatedAt }) => title && year && rating && createdAt && updatedAt
        //       )
        //     ).toBe(true);
        //     done();
        //   } catch (error) {
        //     console.log(resources);
        //     done(error);
        //   }
    
    });
});

