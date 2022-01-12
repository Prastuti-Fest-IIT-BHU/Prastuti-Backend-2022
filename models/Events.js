const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    Name : {
        type : String,
        required : [true, 'Name is required'],
        trim : true,
        enum : {
            Values : [/* Event Names */],
            message : 'Invalid Event Name'
        }
    },
    Participants_Count : {
        type : Integer,
        required : true,
        default : 0
    },
    Team_Event : {
        type : Boolean,
        required : true
    },
    Participants : {
        type : [{
            Team_Id : {type : Schema.Types.ObjectId, ref : 'user'},
            Score : Integer,
            Details : [{
                Round_Name : String,
                Round_Score : Integer}]
        }]
    },
    Teams : {
        type : [{
            Team_Id : {type : Schema.Types.ObjectId, ref : 'team'},
            Score : Integer,
            Details : [{
                Round_Name : String,
                Round_Score : Integer}]
        }]
    }
})

mongoose.exports = mongoose.model('event', EventSchema);