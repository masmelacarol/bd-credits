const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");

router.get("/user/:id", async(req, res) => {
    const { params } = req;
    const id = params.id;
    try {
        const success = await controller.getCredits(id);
        response.success(req, res, success, 200);
    } catch (error) {
        response.error(req, res, error, 400, "Error en el controlador credits");
    }
});

router.get("/denies", async(req, res) => {
    try {
        const success = await controller.getDenyCredits();
        response.success(req, res, success, 200);
    } catch (error) {
        response.error(req, res, error, 400, "Error en el controlador credits");
    }
});

router.get("/pendding", async(req, res) => {
    try {
        const success = await controller.getPenddingPayments();
        response.success(req, res, success, 200);
    } catch (error) {
        response.error(req, res, error, 400, "Error en el controlador credits");
    }
});

router.get("/total", async(req, res) => {
    try {
        const success = await controller.getTotalCredits();
        response.success(req, res, success, 200);
    } catch (error) {
        response.error(req, res, error, 400, "Error en el controlador getTotalCredits");
    }
});

router.get("/pendding/user/:id", async(req, res) => {
    console.log(req.params.id);
    try {
        const success = await controller.getPenddingByUser(req.params.id);
        response.success(req, res, success, 200);
    } catch (error) {
        response.error(req, res, error, 400, "Error en el controlador credits !!");
    }
});

router.post("/", async(req, res) => {
    const { body } = req;
    const credit = {
        value: body.value,
        date: body.date,
        isPay: body.isPay,
    }

    try {
        const success = await controller.createCredit(body.DNI, credit);
        response.success(req, res, success, 200);
    } catch (error) {
        response.error(req, res, "Algo salio mal" + error, 400, "Error en el controlador");
    }

});

module.exports = router;