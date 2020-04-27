const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");

router.get("/", async(req, res) => {
    try {
        const success = await controller.getUsers();
        response.success(req, res, success, 200);
    } catch (error) {
        response.error(req, res, error, 400, "Error en el controlador");
    }
});

router.get("/:id", async(req, res) => {
    const { params } = req;
    const id = params.id
    try {
        const success = await controller.getUserByDNI(id);
        response.success(req, res, success, 200);
    } catch (error) {
        response.error(req, res, error, 400, "Error en el controlador");
    }
});

router.post("/", async(req, res) => {
    const { body } = req;
    const user = {
        name: body.name,
        email: body.email,
        DNI: body.DNI,
    }

    try {
        const success = await controller.createUser(user);
        response.success(req, res, success, 200);
    } catch (error) {
        response.error(req, res, "Algo salio mal" + error, 400, "Error en el controlador");
    }

});

module.exports = router;