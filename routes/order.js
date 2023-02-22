const router = require("express").Router();
const Order = require("../models/Order");

//create
router.post("/", async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        return res.status(200).json(savedOrder);
    } catch (err){
        return res.status(500).json(err);
    }
});

//update
router.put("/:id", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        return res.status(200).json(updatedOrder);
    } catch (err){
        return res.status(500).json(err);
    }
})


//delete
router.delete("/delete/:id", async (req, res) => {
    try{
        await Order.findByIdAndDelete(req.params.id);
        return res.status(200).json("Order has been deleted.");
    } catch (err){
        return res.status(500).json(err);
    }
})

//get order by id
router.get("/get/:id", async (req, res) => {
    try{
        const orders = await Order.findById(req.params.id);
        return res.status(200).json(orders);
    } catch (err){
        return res.status(500).json(err);
    }
})

//get user Order
router.get("/find/:userId", async (req, res) => {
    try{
        const orders = await Order.find({userId: req.params.userId});
        return res.status(200).json(orders);
    } catch (err){
        return res.status(500).json(err);
    }
})

//get all
router.get("/", async (req, res) =>{
    try{
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (err){
        return res.status(500).json(err);
    }
})


module.exports = router;