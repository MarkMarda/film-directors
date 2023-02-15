const router = require("express").Router();

const countriesServices = require("./countries.services");



router.route("/")
  .get(countriesServices.getAllCountries)
  .post(countriesServices.postCountries);

router.route("/:id")
  .get(countriesServices.getCountriesById)
  .patch(countriesServices.patchCountries)
  .delete(countriesServices.deleteCountries)

module.exports = router;




