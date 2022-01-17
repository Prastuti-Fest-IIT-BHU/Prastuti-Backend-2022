const mongoose = require('mongoose');

const userModel = require('./Users');
const requestModel = require('./Requests');

const TeamSchema = new mongoose.Schema({
    Team_Name : {
        type : String,
        unique : [true, 'This Team Name is not available'],
        required : true
    },
    Events : {
        type : [String],
        required : true,
        enum : {
            values: ["Consilium", "Hackathon", "Cryptex", "Codigo", "Simulim", "Recognizance"],
            message : 'Invalid Event Name'
        }
    },
    Members : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    Member_Count : {
        type : Number,
        required : true,
        max : [3, 'Max members allowed is 3']
    },
    Pending_Requests : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'request'
    }]
})

TeamSchema.pre(/^find/, async function(next) {
    console.log('Inside pre find middleware');
    this.populate({
        path: 'Members',
        select: '-Teams -Pending_Requests -__v -Events_Participated -Phone -Total_Score'
    })
    this.populate({
        path: 'Pending_Requests'
    })
    next();
})

const Team = mongoose.model('team', TeamSchema);
module.exports = Team;