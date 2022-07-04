const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser")
const route = require("./routes/route")
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://shiva:ZxJf1KONMThYSpCU@cluster0.yuxls.mongodb.net/RADON_project_TWO", {
        UseNewUrlParser: true
    }).then(() => console.log("MongoDb is Connected"))
    .catch(err => console.log(err))

app.use("/", route);

app.listen(process.env.PORT || 4000, function(req, res) {
    console.log("Express port is running on port :-" + (process.env.PORT || 4000))
})