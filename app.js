const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const orderRoute = require("./routes/order")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cors = require("cors");
const stripeRoute = require("./routes/stripe");

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

app.get("/api/test", ()=>{
    console.log("test is successful");
})
app.use(cors())
app.use(express.json());
app.use("/api/orders", orderRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/checkout", stripeRoute);
app.get('/', (req, res) => {
    res.send('Welcome to Full Stack Development!')
});


app.listen(process.env.PORT || 5001, () => {
    console.log("Backend server is running!");
});