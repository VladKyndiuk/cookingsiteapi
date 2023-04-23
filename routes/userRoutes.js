const Router = require("express").Router;
const router = new Router();

const personController = require("../controller/personController");

// GET
// router.get("/persons", personController.getAllPersons);
router.get("/person/:id", personController.getOnePerson);


router.post("/create_person", personController.createPerson);
// router.post("/delete_person/:id", personController.deletePerson);

// UPDATE
// router.put("/update_person", personController.updatePerson);

module.exports = router;