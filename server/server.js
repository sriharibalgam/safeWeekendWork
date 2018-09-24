var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//Run on PORT
app.listen(port, function () {
    console.log("Server Listening on Port ", port);
})

/********************* Connect To Database *******************************/
// connect to the Database
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/weekend_work");
/********************* /Connect To Database *******************************/


// create Collection

// create Collection
var usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emp_id: Number,
    username: String,
    password: String,
    contact: String,
    role: Number,
});
var Users = mongoose.model("Users", usersSchema);

// Request Schema
var weekendWorkSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emp_id: Number,
    requested_date: { type: Date, default: Date.now() },
    requested_on: String,
    cubicle_info: String,
    approver_id: String,
    contact: String,
    status: Number
})
var WeekendWork = mongoose.model("weekendWork", weekendWorkSchema);

// Request Schema
var emergencyAlertSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emp_id: Number,
    cubicle_info: String,
    lng: String,
    ltd: String,
    contact: String
})
var EmergencyAlert = mongoose.model("emergencyAlert", emergencyAlertSchema);

// Request Schema
var empLocTrackSchema = new mongoose.Schema({
    emp_id: Number,
    location: [{
        lat: String,
        lng: String,
        coords: Object
    }],
    contact: String,
    check_in_time: Date,
    check_out_time: Date
})
var EmpLocTrack = mongoose.model("empLocTrack", empLocTrackSchema);




/********************* Web APIs *******************************/
app.get("/", function (req, res) {
    res.send("<h1>Welcome to Safe Weekend Work HomePage</h1>");
});

// Get users

app.post('/getExperience', function (req, res) {
    Users.findOne({ 'userId': mongoose.Types.ObjectId(req.user.id) }, function (err, responseData) {
        if (err) {
            console.trace(err);
        } else if (responseData) {
            res.json({ success: true, data: responseData.experience });
        } else {
            res.json({ success: false, message: 'Data Retrieved' });
        }
    });
});

// Get users
app.get('/getEmpLocations', function (req, res) {
    console.log("Getting all Employees Locations");
    // use mongoose to get all reviews in the database
    EmpLocTrack.find({}, function (err, users) {
        if (err)
            res.send(err)
        res.json(users); // return all reviews in JSON format
    });
});

app.get('/getWeekendRequests', function (req, res) {
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
        firstName: "Sai Praveen",
        lastName: "Ananthu",
        emp_id: 679636,
        username: "sai.praveen@infosys.com",
        password: "infy123",
        role: 3,
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
app.all("/saveWeekendRequest", function (req, res) {
    var myData = new WeekendWork(req.body);
    myData.save()
        .then(function (data) {
            res.send({ status: 'SUCCESS', message: "Request Raised Successfull"});
        })
        .catch(function (err) {
            res.send("Request Failed");
        })
});

app.all('/login', function (req, res) {
    console.log(req.body);
    Users.find({}, function(err, userData){
        if (err) {response.send(err);}
        console.log('words ', userData);
        
        res.json({data: userData});
     });


});
