const express = require('express');
const productController = require("../controllers/product.controller");
const productRouter = express.Router();

/*обработка маршрутов*/
productRouter.get("/all", productController.getALLProducts); /*получить список всех товаров*/
productRouter.get("/:id", productController.getProduct); /*получить один товар*/

module.exports = productRouter;