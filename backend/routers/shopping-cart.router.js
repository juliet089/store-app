const express = require('express');
const shoppingCartController = require("../controllers/shopping-cart.controller");
const shoppingCartRouter = express.Router();

/*обработка маршрутов*/
shoppingCartRouter.get("/all", shoppingCartController.getALLProducts); /*получить список всех товаров*/
shoppingCartRouter.post("/add", shoppingCartController.addShoppingCartRow); /*добавление*/
shoppingCartRouter.put("/change", shoppingCartController.changeQuantityShoppingCartRow); /*изменение*/
shoppingCartRouter.delete("/remove/:id", shoppingCartController.removeShoppingCartRow);

module.exports = shoppingCartRouter;