const router = require("express").Router();
const Product = require("../models/Product");

// get product by id
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// get products by title
router.get("/findByTitle/:title", async (req, res) => {
    try {
        const products = await Product.find({title: {$regex: ".*" + req.params.title + ".*"}});
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// get all products
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({createdAt: -1}).limit(5);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await Product.find();
        }
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json(err);
    }
})

module.exports = router;