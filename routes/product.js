const router = require("express").Router();
const Product = require("../models/Product");

// add new product
router.post("/newProduct", async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        return res.status(200).json(savedProduct);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// delete product
router.delete("/delete/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json("Product has been deleted.");
    } catch (err) {
        return res.status(500).json(err);
    }
})

// update product
router.put("/update/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        return res.status(200).json(updatedProduct);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// get product by id
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// get product by title
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