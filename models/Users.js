const mongoose = require('mongoose');

const teamModel = require('./Teams');
const requestModel = require('./Requests');
const eventModel = require('./Events');

const UserSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : [true, 'Name is required'],
        trim : true
    },
    email_id : {
        type : String,
        required: [true, 'e-mail is required'],
        unique : [true, 'Given user already exists'],
        trim : true,
        validate: {
            validator: function(input) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
            },
            message: "Please enter a valid email"
        }
    },
    College : {
        type : String
    },
    Profile_Photo:{
        type: String,
        default: 'https://ibb.co/9Gzy6Nj' 
    },
    Phone : {
        type : Number
    },
    Teams : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    }],
    Pending_Requests : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'request'
    }],
    Total_Score : {
        type : Number,
        default : 0
    },
    Events_Participated : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
    }]
})

UserSchema.pre(/^find/, async function(next) {
    this.populate({
        path: 'Pending_Requests',
        select: '-__v -Req_to'
    });
    this.populate({
        path: 'Teams',
        select: '-Pending_Requests -Events -__v'
    });
    this.populate({
        path: 'Events_Participated',
        select: '-Participants -Teams -Team_Event -__v'
    })
    next();
})

const User = mongoose.model('user', UserSchema);
module.exports = User;