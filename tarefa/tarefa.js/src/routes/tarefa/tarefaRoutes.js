const express = require('express');
const router  = express.Router();

module.exports = (controller) => {
    router.post('/',      (req, res) => controller.criar(req, res));
    router.get('/',       (req, res) => controller.listar(req, res));
    router.get('/:id',    (req, res) => controller.buscar(req, res));
    router.delete('/:id', (req, res) => controller.deletar(req, res));

    return router;
};
