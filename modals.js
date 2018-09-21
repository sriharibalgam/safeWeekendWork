
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

