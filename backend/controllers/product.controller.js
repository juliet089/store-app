const {findALLProducts, findProduct} = require("../services/product.service");
const msgs = require('../lib/messages.lib');
const ResObj = require("../models/res.Obj.class");

exports.getALLProducts = async (req, res) => {
    const user = await req.user;
    const userId = user ? user.id : null;
    const allProducts = await findALLProducts(userId);

    res.send(new ResObj({
        data: allProducts
    }));
};

exports.getProduct = async (req, res) => {
    const user = await req.user;
    const userId = user ? user.id : null;
    const productId = req.params.id;

    console.log('req.params.id = ', req.params.id);

    const product = await findProduct(userId, productId);

    res.send(new ResObj({
        data: product
    }));
};