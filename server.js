const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/ABBApoc", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("connection error", err));

    var areaderSchema = new mongoose.Schema(
        {
            Hostname: { type: String },                 //Host name
            IP: { type: String, required: true },       //Reader IP address
            Areaname: { type: String, required: true }, //區域名稱
            Model: { type: String },                //Model name AL1320
            Description: { type: String },              //說明
            systemTime: { type: Date, default: Date.now }   //修改時間
        }
    );


// const searchSchema = new mongoose.Schema({
//     title: String,
//     url: String,
// });

const Search = mongoose.model("areaders", areaderSchema);

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());

app
    .route("/")
    .get((req, res) => {
        res.render("search");
    })
    .post((req, res) => {
        //Declare variables
        let hint = "";
        let response = "";
        let searchQ = req.body.search.toLowerCase();
        let filterNum = 1;

        if (searchQ.length > 0) {
            console.log(searchQ);

            Search.find()
                .exec(function (err, stories) {
                    if (err) return handleError(err);

                    console.log(stories);
                })

            // Search.find(function (err, results) {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         results.forEach(function (sResult) {
            //             console.log(sResult.title);
            //             if (sResult.title.indexOf(searchQ) !== -1) {
            //                 if (hint === "") {
            //                     hint =
            //                         "<a href='" +
            //                         sResult.url +
            //                         "' target='_blank'>" +
            //                         sResult.title +
            //                         "</a>";
            //                 } else if (filterNum < 6) {
            //                     hint =
            //                         hint +
            //                         "<br /><a href='" +
            //                         sResult.url +
            //                         "' target='_blank'>" +
            //                         sResult.title +
            //                         "</a>";
            //                     filterNum++;
            //                 }
            //             }
            //         });
            //     }
            //     if (hint === "") {
            //         response = "no suggestion";
            //     } else {
            //         response = hint;
            //     }

            //     res.send({ response: response });
            // });
        }
    });

//assign port
var port = process.env.PORT || 3000;
app.listen(port, () => console.log("server run at port " + port));
