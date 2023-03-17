const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        desc: {type: String, required: true},
        img: {type: String, required: true},
        categories: {type: Array},
        size: {type: Array, default: ["64G", "128G", "256G", "512G"]},
        color:{type:Array, default:['white', 'black']},
        price: {type: Number, required: true},
        inStock: {type: Boolean, default: true},
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", ProductSchema);