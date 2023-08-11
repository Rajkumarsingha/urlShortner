const express = require("express");
const mongoose = require("mongoose");
const app = express();
const urlRoutes = require("./routes/urls");
const dotenv = require("dotenv");
dotenv.config();

mongoose
    .connect("mongodb+srv://rsingha:rsingha@cluster0.r0csg0b.mongodb.net/urlShortner?retryWrites=true&w=majority")
    .then(() => console.log("Connection successful"))
    .catch((err) => console.log(err))

app.use(express.json());
app.use("/api", urlRoutes);
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port no ${process.env.PORT}`)
});