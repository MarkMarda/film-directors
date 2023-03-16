const request = require("supertest");

const {app, server} = require("../src/app");



describe("Test GET /countries", () => {

  test("It should respond with 200 success", async() => {
    const response = await  request(app)
      .get("/api/v1/countries")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

});

describe("Test POST /countries", () => {

  //peticion valida
  test("It should respond with 201 created", async() => {
    const newCountry = {
      name: "Norway"
    };

    const response = await request(app)
      .post("/api/v1/countries")
      .send(newCountry)
      .expect(201) //NOTA: 400 si funciona, esta al reves
      .expect("Content-Type", /application\/json/)
  });

  //peticion erronea
  test("It should catch invalid data", async() => {
    const response = await request(app)
      .post("/api/v1/countries")
      .send({name: ""})
      .expect(400);
  });

  //peticion sin datos
  test("It should respond with 400 because there is no data", async() => {
    const response = await request(app)
      .post("/api/v1/countries")
      .send({})
      .expect(400);
  });

});

afterAll(() => {

  server.close();

});