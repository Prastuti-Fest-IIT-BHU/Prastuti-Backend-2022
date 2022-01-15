const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : [true, 'Name is required'],
        trim : true,
        enum : {
            Values : ["consilium", "hackathon", "cryptex", "codigo", "simulim", "recognizance"],
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
    Participants : {
        type : [{
            Participant : {
                type : mongoose.Schema.Types.ObjectId, 
                ref : 'user'
            },
            Score : Number,
            Details : [{
                Round_Name : String,
                Round_Score : Number
            }]
        }]
    },
    Teams : {
        type : [{
            Team : {
                type : mongoose.Schema.Types.ObjectId, 
                ref : 'team'
            },
            Score : Number,
            Details : [{
                Round_Name : String,
                Round_Score : Number
            }]
        }]
    }
})

EventSchema.pre(/^find/, async function(next) {
    this.Participants.populate({
        path: 'Participant',
        select: 'Name email_id College'
    })
    this.Teams.populate({
        path: 'Team',
        select: 'Team_Name Members'
    })
    next();
})

const Event = mongoose.model('event', EventSchema);
module.exports = Event;