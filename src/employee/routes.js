const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.route("/")
    .get(controller.getAllEmployee)
    .post(controller.createEmployee);

router.route("/:id")
    .get(controller.getEmployeeById)
    .patch(controller.updateEmployeeById)
    .delete(controller.deleteEmployeeById);

module.exports = router;