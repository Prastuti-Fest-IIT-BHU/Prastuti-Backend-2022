const mongoose = require('mongoose');

const userModel = require('./Users');
const teamModel = require('./Teams');

const EventSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : [true, 'Name is required'],
        trim : true,
        enum : {
            values : ["Consilium", "Hackathon", "Cryptex", "Codigo", "Simulim", "Recognizance"],
            message : 'Invalid Event Name'
        }
    },
    Participants_Count : {
        type : Number,
        required : true,
        default : 0
    },
    Team_Event : {
        type : Boolean,
        required : true
    },
    Participants : [{
        participant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        Score: Number
    }],
    Teams : [{
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'team'
        },
        Score: Number
    }]
})

EventSchema.pre(/^find/, async function(next) {
    this.populate({
        path: 'Participants.participant',
        select: '-Teams -Pending_Requests -Events_Participated -__v -Total_Score'
    })
    this.populate({
        path: 'Teams.team',
        select: '-Events_Participated -Pending_Requests -__v'
    })
    next();
})

const Event = mongoose.model('event', EventSchema);
module.exports = Event;