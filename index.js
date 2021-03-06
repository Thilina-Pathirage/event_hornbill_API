const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require('cors');
require ("dotenv").config;

const EventModel = require("./models/Event");
const UserModel = require("./models/Users");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://thilina:thilina@cluster0.qvhfs.mongodb.net/eventDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

app.post("/", async(req, res) => {

    const title = req.body.title;
    const location = req.body.location; 
    const timezone = req.body.timezone;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const online_link = req.body.online_link;
    const description = req.body.description;
    

    const event = new EventModel({
        title: title,
        location: location, 
        timezone: timezone, 
        start_date: start_date,
        end_date: end_date,
        start_time: start_time,
        end_time: end_time,
        online_link: online_link,
        description: description,
    });

    try{
        await event.save();
        res.send("data inserted!");
    }catch(err){
        console.log(err);
    }
})


app.get("/events", async(req, res) => {

    EventModel.find({}, (err, result) => {
        if(err){
            res.send("error");
        }
        res.send(result);
    })
})

app.delete("/delete/:id", async(req, res) => {
    const id = req.params.id;
    await EventModel.findByIdAndRemove(id).exec();
    res.send(id);
})


// User Login

app.post("/signup", async(req, res) => {

    const name = req.body.name;
    const email = req.body.email; 
    const pwd = req.body.pwd;
    

    const user = new UserModel({
        name: name,
        email: email, 
        pwd: pwd,
    });

    try{
        await user.save();
        res.send("User registered!");
    }catch(err){
        console.log(err);
    }
})

app.get("/getusers", async(req, res) => {

    UserModel.find({}, (err, result) => {
        if(err){
            res.send("error");
        }
        res.send(result);
    })
})

app.listen(process.env.PORT || 5000, () => {
    console.log("The Server running on port 5000..");
});