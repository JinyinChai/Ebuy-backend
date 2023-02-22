const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const orderRoute = require("./routes/order")
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

app.get("/api/test", ()=>{
    console.log("test is successful");
})
app.use(cors())
app.use(express.json());
app.use("/api/orders", orderRoute);
app.get('/', (req, res) => {
    res.send('Welcome to Full Stack Development!')
});


app.listen(process.env.PORT || 5001, () => {
    console.log("Backend server is running!");
});