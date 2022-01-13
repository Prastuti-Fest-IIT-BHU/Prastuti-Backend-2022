const mongoose = require('mongoose');

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
    Phone : {
        type : Number
    },
    Teams : {
        type : [{
            type : mongoose.Schema.Types.ObjectId, 
            ref : 'team'
        }],
        default : []
    },
    Pending_Requests : {
        type : [{
            type : mongoose.Schema.Types.ObjectId, 
            ref : 'request'
        }],
        default : []
    },
    Total_Score : {
        type : Number,
        default : 0
    },
    Events_Participated : {
        Type : [{
            Event_Name : String,
            Event_Score : Number
        }]
    }
})

UserSchema.pre(/^find/, async function(next) {
    await this.populate({
        path: 'Pending_Requests'
    });
    await this.populate({
        path: 'Teams',
        select: 'Team_Name Members'
    })
})

const User = mongoose.model('user', UserSchema);
module.exports = User;