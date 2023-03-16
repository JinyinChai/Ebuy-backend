const User = require("../models/User");
const {query} = require("express");
const router = require("express").Router();
const KEY = "sk_test_51MmM5pJSv3766OLssKolOQuj8PLLChdoQ8ZBhF4m483HYMnEte8FD1dFH3PuWdzv7TYZpWMLvySLd7Di6I78eeJ000Ec9Mz32V";
const stripe = require("stripe")(KEY);

router.post("/payment", (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            return res.status(500).json(stripeErr);
        } else {
            return res.status(200).json(stripeRes);
        }
    });
});

router.get("/", async (req, res) => {

    try{
        const payments = await stripe.charges.list({
            limit: 20,
        });

        return res.status(200).json(payments);
    } catch (err){
        return res.status(500).json(err);
    }
})


router.get("/:id", async (req, res) => {
    try{
        const payments = await stripe.charges.retrieve(req.params.id);
        return res.status(200).json(payments);
    } catch (err){
        return res.status(500).json(err);
    }
})

router.get("/search/:postal_code", async (req, res) => {

    try{
        const payments = await stripe.charges.search({
            query: `billing_details.address.postal_code: \"${req.params.postal_code}\"`});
        return res.status(200).json(payments);
    } catch (err){
        return res.status(500).json(err);
    }
})


module.exports = router;