const express = require('express');
const router  = express.Router();
const middleware = require('../../middlewares/usuario/middlwersUsuario');

module.exports = (controller) => {
    router.post('/',      middleware.validarCriacao, (req, res, next) => controller.criar(req, res, next));
    router.get('/',       (req, res, next) => controller.listar(req, res, next));
    router.get('/:id',    middleware.validarId, (req, res, next) => controller.buscar(req, res, next));
    router.delete('/:id', middleware.validarId, (req, res, next) => controller.deletar(req, res, next));
    return router;
};
