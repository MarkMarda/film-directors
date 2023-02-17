const router = require("express").Router();

const directorsServices = require("./directors.services");



router.route("/")
  .get(directorsServices.getAllDirectors)
  .post(directorsServices.postDirectors);

router.route("/:id")
  .get(directorsServices.getDirectorsById)
  .patch(directorsServices.patchDirectors)
  .put(directorsServices.putDirectors)
  .delete(directorsServices.deleteDirectors);

module.exports = router; 