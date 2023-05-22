const Router = require("express").Router;
const router = new Router();

const personController = require("../controller/personController");

// GET
router.get("/persons", personController.getAllPersons);
router.get("/get_user_info", personController.getUserInfo);



router.post("/authorize", personController.authorize);
router.post("/create_person", personController.createPerson);
// router.post("/change_password", personController.changeUserPassword);


// router.post("/delete_person/:id", personController.deletePerson);

// UPDATE
// router.put("/update_person", personController.updatePerson);

module.exports = router;
