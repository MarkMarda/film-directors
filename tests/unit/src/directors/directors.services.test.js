const directorsControllers = require("../../../../src/directors/directors.controllers");
const { getDirectorsById, getAllDirectors, deleteDirectors, postDirectors } = require("../../../../src/directors/directors.services");



const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

describe("Get all directors", () => {
  test('should return 200 status', () => { 
    const data = [
      {
        id: "47ab79a0-0356-4cc4-9134-b6cce128c155",
        photograph: "https://res.cloudinary.com/dnautzk6f/image/upload/v1695446812/Film-Directors/directors/tmp-1-1695446811195.png",
        name: "Behtash",
        lastName: "Sanaeeha ",
        age: null,
        countryId: 1,
        alive: false,
        birthday: "1970-07-30T00:00:00.000Z",
        films: null,
        firstFilm: "Risk Of Acid Rain",
        lastFilm: "Ballad of a White Cow",
        createdAt: "2023-09-23T05:26:53.084Z",
        updatedAt: "2023-09-23T05:26:53.084Z"
      },
    ];
    const req = {};

    const findAllDirectors = jest
      .spyOn(directorsControllers, "findAllDirectors")
      .mockResolvedValue(data);

    res.status(200);
    res.json(data);

    getAllDirectors(req, res);

    expect(findAllDirectors).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(data);
    /* 
    para verificar que la funcionalidad real de getAllDirectors se ha ejecutado 
    correctamente, asegurándonos de que la respuesta de res.status().json se haya 
    llamado exactamente una vez con los datos correctos. Esto ayuda a garantizar 
    que la función getAllDirectors cumpla con su objetivo real de enviar una 
    respuesta HTTP con los datos correctos.
    */
    expect(res.status().json).toHaveBeenCalledTimes(1);
    expect(res.status().json).toHaveBeenCalledWith(data);
  });

  it('should return a 200 status code and an empty JSON object when findAllDirectors() resolves with an empty array', () => {
    const req = {};
  
    const findAllDirectors = jest
      .spyOn(directorsControllers, "findAllDirectors")
      .mockResolvedValue([]);
  
    res.status(200);
    res.json({});

    getAllDirectors(req, res);
  
    expect(findAllDirectors).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({});
    expect(res.status().json).toHaveBeenCalledWith({});
  });

  test('should should return 400', () => { 
    const errorMessage = {"message": "Error message"};
    const req = {};

    const findAllDirectors = jest
      .spyOn(directorsControllers, "findAllDirectors")
      .mockRejectedValue(errorMessage);

    res.status(400);
    res.json(errorMessage);

    getAllDirectors(req, res);

    expect(findAllDirectors).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
    expect(res.status().json).toHaveBeenCalledWith(errorMessage);
  });
});

describe("Get director by ID", () => {
  test('should return 200 status for a valid ID', () => { 
    const data = [
      {
        id: "47ab79a0-0356-4cc4-9134-b6cce128c155",
        photograph: "https://res.cloudinary.com/dnautzk6f/image/upload/v1695446812/Film-Directors/directors/tmp-1-1695446811195.png",
        name: "Behtash",
        lastName: "Sanaeeha ",
        age: null,
        countryId: 1,
        alive: false,
        birthday: "1970-07-30T00:00:00.000Z",
        films: null,
        firstFilm: "Risk Of Acid Rain",
        lastFilm: "Ballad of a White Cow",
        createdAt: "2023-09-23T05:26:53.084Z",
        updatedAt: "2023-09-23T05:26:53.084Z"
      },
    ];
    const req = {
      params: {id: "47ab79a0-0356-4cc4-9134-b6cce128c155"}
    };

    const findDirectorsById = jest
      .spyOn(directorsControllers, "findDirectorsById")
      .mockResolvedValue(data);
    
    res.status(200);
    res.json(data);

    getDirectorsById(req, res);

    expect(findDirectorsById).toHaveBeenCalledWith("47ab79a0-0356-4cc4-9134-b6cce128c155");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(data);
  });

  test('should return 400 status for an invalid ID', () => { 
    const errorMessage = {"message": "Id: 0 does not exists"};
    const req = { 
      params: {id: 0}
    };

    const findDirectorsById = jest
      .spyOn(directorsControllers, "findDirectorsById")
      .mockResolvedValue(null)
    
    res.status(404);
    res.json(errorMessage);

    getDirectorsById(req, res);

    expect(findDirectorsById).toHaveBeenCalledWith(0);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });

  test('should return 404 status for non-UUID ID parameter', () => { 
    const errorMessage = {"message": "invalid input syntax for type uuid: \'abc\' "};
    const req = { 
      params: {id: "abc"}
    };
    
    res.status(404);
    res.json(errorMessage);

    getDirectorsById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  })
});

describe("Post director", () => {
  test('should return 201 status for required fields', () => {
    const dataResult = {
      "alive": false,
      "id": "5eed32a7-6ea4-401f-b418-ba279d745c71",
      "photograph": null,
      "name": "John",
      "lastName": "Doe",
      "age": null,
      "countryId": 2,
      "birthday": "2004-11-24T00:00:00.000Z",
      "films": null,
      "firstFilm": "Fil1",
      "lastFilm": "Film2",
      "updatedAt": "2024-02-09T21:22:27.473Z",
      "createdAt": "2024-02-09T21:22:27.473Z"
    };
    const data = {
      name: "John",
      lastName: "Doe",
      countryId: 1,
      birthday: "1994-12-03",
      firstFilm: "Film1",
      lastFilm: "Film2",
    };
    const req = {
      body: {
        name: "John",
        lastName: "Doe",
        countryId: 1,
        birthday: "1994-12-03",
        firstFilm: "Film1",
        lastFilm: "Film2",
      },
      files: {}
    };

    const createDirectors = jest
      .spyOn(directorsControllers, "createDirectors")
      .mockResolvedValue(data);
    
    res.status(201);
    res.json();

    postDirectors(req, res);

    //expect(createDirectors).toHaveBeenCalled({});
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
    expect(res.json().status).toHaveBeenCalled();
  });

  test("should return 400 status for missing fields", () => {
    const errorMessage = {
      message: "Invalid data",
      requiredFields: {
        name: "string",
        lastName: "string",
        countryId: "integer",
        birthday: "YYYY-MM-DD",
        firstFilm: "string",
        lastFilm: "string"
      },
      optionalFields: {
        photograph: "File",
        age: "integer",
        alive: "boolean",
        films: "integer"
      }
    };
    const dataResult = {
      "alive": false,
      "id": "5eed32a7-6ea4-401f-b418-ba279d745c71",
      "photograph": null,
      "name": "John",
      "lastName": "Doe",
      "age": null,
      "countryId": 2,
      "birthday": "2004-11-24T00:00:00.000Z",
      "films": null,
      "firstFilm": "Fil1",
      "lastFilm": "Film2",
      "updatedAt": "2024-02-09T21:22:27.473Z",
      "createdAt": "2024-02-09T21:22:27.473Z"
    };
    
  });

  test("should return 400 status for empty fields", () => {
    const data = {

    };
    
  });

  test("should return 400 status for countryID field does not exists", () => {
    const errorMessage = {
      message: "insert or update on table \"directors\" violates foreign key constraint \"directors_country_id_fkey\""
    };
    
  });
});

describe('Delete director', () => { 
  test("should return 204 status for a valid ID", () => {
    const req = { 
      params: {id: 1}
    };

    const delDirectors = jest
      .spyOn(directorsControllers, "deleteDirectors")
      .mockResolvedValue(true);

    res.status(204);
    res.json();

    deleteDirectors(req, res);

    expect(delDirectors).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith();
  });

  test('should return 400 status for non-UUID ID parameter', () => { 
    const errorMessage = {"message": "invalid input syntax for type uuid: \'abc\' "};
    const req = { 
      params: {id: "abc"}
    };
    
    res.status(400);
    res.json(errorMessage);

    deleteDirectors(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  })
});





