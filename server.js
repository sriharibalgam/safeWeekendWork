var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Run on PORT
app.listen(port, "10.64.103.151", function () {
    console.log("Server Listening on Port ", port);
})

/********************* Connect To Database *******************************/
// connect to the Database
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/weekend_work");
/********************* /Connect To Database *******************************/


// create Collection
var usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emp_id: Number,
    username: String,
    password: String,
    role: Number,
});
var Users = mongoose.model("Users", usersSchema);

// Request Schema
var weekendWorkSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emp_id: Number,
    requested_date: String,
    cubicle_info: String,
    approver_id: String,
    status: Number
})
var WeekendWork = mongoose.model("weekendWork", weekendWorkSchema);


/********************* Web APIs *******************************/
app.get("/", function (req, res) {
    res.send("<h1>Welcome to Safe Weekend Work HomePage</h1>");
});

// Get users
app.get('/getUsers', function (req, res) {
    console.log("Getting all Users");
    // use mongoose to get all reviews in the database
    Users.find({}, function (err, users) {
        if (err)
            res.send(err)
        res.json(users); // return all reviews in JSON format
    });
});

app.get('/getWeekndRequests', function (req, res) {
    console.log("fetching Requests");
    // use mongoose to get all reviews in the database
    WeekendWork.find(function (err, weekendReq) {
        if (err)
            res.send(err)
        res.json(weekendReq); // return all reviews in JSON format
    });
});

app.all('/saveUser', function (req, res) {
    console.log("saveWeekndRequest");
    // create a review, information comes from request from Ionic

    Users.create({
        firstName: "Srihari",
        lastName: "Balgam",
        emp_id: 791606,
        username: "sriharibalgam@infosys.com",
        password: "infy123",
        role: 4,
    }, function (err, user) {
        if (err)
            res.send(err);
        Users.find(function (err, users) {
            if (err)
                res.send(err)
            res.json(users);
        });
    });
});

/* Save Request */
app.all("/saveWeekndRequest", function (req, res) {
    var myData = new WeekendWork({
        "firstName" : "Sai",
        "lastName" : "Ananthu",
        "emp_id" : "791656",
        "req_date" : "infy123",
        "cubical_info": "HYD02 B4 05 b 040",
        "approved_by" : "789654",
        "approval_status": "APPROVED"
    });
    myData.save()
        .then(function (data) {
            res.send("Request Raised Successfull")
        })
        .catch(function (err) {
            res.send("Request Failed");
        })
});
