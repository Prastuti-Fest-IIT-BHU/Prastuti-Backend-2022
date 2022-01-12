const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
    Team_Name : {
        type : String,
        unique : [true, 'This Team Name is not available.'],
        required : true
    },
    Events : {
        type : [String],
        required : true,
        enum : {
            values: [/*Event Names*/],
            message : 'Invalid Event Name'
        }
    },
    Members : {
        type : [{type : Schema.Types.ObjectId, ref : 'user'}],
        required : true
    },
    Member_Count : {
        type : Integer,
        required : true,
        max : [3, 'Max members allowed is 3.']
    },
    Pending_Requests : {
        type : [{type : Schema.Types.ObjectId, ref : 'request'}]
    }
})

mongoose.exports = mongoose.model('team', TeamSchema);