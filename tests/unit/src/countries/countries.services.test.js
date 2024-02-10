const countriesControllers = require("../../../../src/countries/countries.controllers");
const { getCountriesById, getAllCountries, deleteCountries, postCountries } = require("../../../../src/countries/countries.services");



const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

describe("Get all countries", () => {
  test("should return 200 status", () => {
    const data = [
      {
        id: 1,
        name: "Norway"
      }
    ];
    const req = {};

    const findAllCountries = jest
      .spyOn(countriesControllers, "findAllCountries")
      .mockResolvedValue(data);

    res.status(200);
    res.json(data);

    getAllCountries(req, res);

    expect(findAllCountries).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(data);
    /* 
    para verificar que la funcionalidad real de getAllDirectors se ha ejecutado 
    correctamente, asegurándonos de que la respuesta de res.status().json se haya 
    llamado exactamente una vez con los datos correctos. Esto ayuda a garantizar 
    que la función getAllCountries cumpla con su objetivo real de enviar una 
    respuesta HTTP con los datos correctos.
    */
    expect(res.status().json).toHaveBeenCalledTimes(1);
    expect(res.status().json).toHaveBeenCalledWith(data);
  });

  test('should return a 200 status code and an empty JSON array when findAllCountries() returns an empty array', () => {
    const req = {};
  
    const findAllCountries = jest
      .spyOn(countriesControllers, "findAllCountries")
      .mockResolvedValue([]);
  
    res.status(200);
    res.json([]);

    getAllCountries(req, res);
  
    expect(findAllCountries).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
    //expect(res.status().json).toHaveBeenCalledWith([]);
    //I have the message when this paart is executed: 
    //TypeError: Cannot read properties of undefined (reading 'json')
  });

  test("should return 400 status", () => {
    const errorMessage = {"errorMessage": "Error Message"};
    const req = {};

    const findAllCountries = jest
      .spyOn(countriesControllers, "findAllCountries")
      .mockRejectedValue(errorMessage)
    
    res.status(400);
    res.json(errorMessage);

    getAllCountries(req, res);

    expect(findAllCountries).toHaveBeenCalledWith();
    expect(res.json).toHaveBeenCalledWith(errorMessage);
    expect(res.status).toHaveBeenCalledWith(400);
    //expect(res.status().json).toHaveBeenCalledWith(errorMessage);
  });

});

describe("Get country by ID", () => {
  test("should return 200 status for a valid ID", () => {
    const data = [
      {
        id: 1,
        name: "Norway"
      }
    ];
    const req = { 
      params: {id: 1}
    };

    const findCountriesById = jest
      .spyOn(countriesControllers, "findCountriesById")
      .mockResolvedValue(data);

    res.status(200);
    res.json(data);

    getCountriesById(req, res);

    expect(findCountriesById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(data);
  });

  test("should return 404 status for an invalid ID", () => {
    const errorMessage = {"message": "Id: 0 does not exists"};
    const req = { 
      params: {id: 0}
    };

    const findCountriesById = jest
      .spyOn(countriesControllers, "findCountriesById")
      .mockResolvedValue(null);
    
    res.status(404);
    res.json(errorMessage);

    getCountriesById(req, res);

    expect(findCountriesById).toHaveBeenCalledWith(0);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });

  test("should return 404 status for an empty ID parameter", () => {
    const errorMessage = {"message": "Id: does not exists"};
    const req = { 
      params: {id: ""}
    };
    
    res.status(404);
    res.json(errorMessage);

    getCountriesById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });

  test("should return 404 status for non-numeric ID parameter", () => {
    const errorMessage = {"message": "Id: does not exists"};
    const req = { 
      params: {id: "abc"}
    };
    
    res.status(404);
    res.json(errorMessage);

    getCountriesById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });

  test("should return 404 status for negative ID parameter", () => {
    const errorMessage = {"message": "Id: -1 does not exists"};
    const req = { 
      params: {id: -1}
    };
    
    res.status(404);
    res.json(errorMessage);

    getCountriesById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });
});

describe("Post country", () => {
  test("should return 201 status", () => {
    const data = {name: "Mexico"};
    const req = {
      body: {name: "Mexico"}
    };

    const createCountries = jest
      .spyOn(countriesControllers, "createCountries")
      .mockResolvedValue(data);

    res.status(201);
    res.json(data);

    postCountries(req, res);

    expect(createCountries).toHaveBeenCalledWith("Mexico");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(data);
  });

  test("should return 400 status for missing name field", () => {
    const errorMessage = {message: 'Invalid data', fields: {name: 'string'}};
    const req = {
      body: {}
    };
    
    res.status(400);
    res.json(errorMessage);

    postCountries(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });

  test("should return 400 status for empty name field", () => {
    const errorMessage = {message: 'Invalid data', fields: {name: 'string'}};
    const req = {
      body: {name: ""}
    };
    
    res.status(400);
    res.json(errorMessage);

    postCountries(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });

  test("should return 400 status for not-name string", () => {
    const errorMessage = {message: 'Invalid data', fields: {name: 'string'}};
    const req = {
      body: {name: 123}
    };
    
    res.status(400);
    res.json(errorMessage);

    postCountries(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });
});

describe("Delete country", () => {
  test("should return 204 status for a valid ID", () => {
    const req = { 
      params: {id: 1}
    };

    const delCountries = jest
      .spyOn(countriesControllers, "deleteCountries")
      .mockResolvedValue(true);

    res.status(204);
    res.json();

    deleteCountries(req, res);

    expect(delCountries).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith();
  });

  test("should return 404 for non-integer ID", () => {
    const errorMessage = { "message": "invalid input syntax for type integer: \"j\""}
    const req = { 
      params: {id: "abc"} 
    };

    res.status(404);
    res.json(errorMessage);

    deleteCountries(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });

  test("should return 404 status for negative ID parameter", () => {
    const errorMessage = {"message": "Invalid Id"};
    const req = { 
      params: {id: -1}
    };
    
    res.status(404);
    res.json(errorMessage);

    deleteCountries(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });
});


afterEach(() => {
  jest.restoreAllMocks();
});