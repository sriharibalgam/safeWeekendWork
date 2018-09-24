
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
    requested_date: { type:Date,default:Date.now() },    
    cubicle_info: String,
    approver_id: String,
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
var emergencyAlert = mongoose.model("emergencyAlert", emergencyAlertSchema);

// Request Schema
var empLocTrackSchema = new mongoose.Schema({
    emp_id: Number,
    location:[{
        lat:String,
        lng:String,
        coords: Object
    }],
    contact: String,
    check_in_time: { type:Date,default:Date.now() },
    check_out_time: ''
})
var empLocTrack = mongoose.model("empLocTrack", empLocTrackSchema);

