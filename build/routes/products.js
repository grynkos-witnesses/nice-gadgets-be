"use strict";
const expressRouter = require('express');
const productsController = require('../controllers/products');
const router = expressRouter.Router();
router.get('/products', productsController.getAllWithParams);
router.get('/products/:filter', productsController.getFilteredData);
router.get('/products/:phoneId/:recomended', productsController.getRecomended);
module.exports = {
    router,
};
