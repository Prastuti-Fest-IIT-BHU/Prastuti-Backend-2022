const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Name : {
        type : String,
        required : [true, 'Name is required'],
        trim : true
    },
    email_id : {
        type : String,
        required: [true, 'e-mail is required'],
        unique : true,
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
    Phone : {
        type : Number
    },
    Teams : {
        type : [{type : Schema.Types.ObjectId, ref : 'team'}],
        default : {}
    },
    Pending_Requests : {
        type : [{type : Schema.Types.ObjectId, ref : 'request'}],
        default : {}
    },
    Total_Score : {
        type : Integer,
        default : 0
    },
    Events_Participated : {
        Type : [{
            Event_Name : String,
            Event_Score : Integer
        }]
    }
})

mongoose.exports = mongoose.model('user', UserSchema);