const request = require("supertest");

const {app, server} = require("../src/app");



describe("GET directors/", () => {

  test('should respond with 200 succes', async() => { 
    const response = await request(app)
      .get("/api/v1/directors")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

});

afterAll(() => {
  
  server.close();

});
