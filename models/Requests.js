const mongoose = require('mongoose');

const userModel = require('./Users');
const teamModel = require('./Teams');

const ReqSchema = new mongoose.Schema({
    For_Team : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'team',
        required : true
    },
    Req_to : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'user',
        required : true
    },
    Req_From : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

ReqSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'For_Team',
        select: '-Pending_Requests -Events -__v'
    })
    this.populate({
        path: 'Req_to',
        select: '-Teams -__v -Events_Participated -Phone -Total_Score -Pending_Requests'
    })
    this.populate({
        path: 'Req_From',
        select: '-Teams -__v -Events_Participated -Phone -Total_Score -Pending_Requests'
    })
    next();
})

ReqSchema.pre('remove', function(next) {
    this.model('team').remove({
        Pending_Requests : this._id
    })
    this.model('user').remove({
        Pending_Requests : this._id
    })
})

const Request = mongoose.model('request', ReqSchema);
module.exports = Request;