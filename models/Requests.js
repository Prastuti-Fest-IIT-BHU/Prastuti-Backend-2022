const mongoose = require('mongoose');

const ReqSchema = new mongoose.Schema({
    For_Team : {
        type : {type : Schema.Types.ObjectId, ref : 'team'},
        required : true
    },
    Req_to : {
        type : {type : mongoose.Schema.Types.ObjectId, ref : 'user'},
        required : true
    }
})

ReqSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'For_Team',
        select: 'Team_Name Members'
    })
    this.populate({
        path: 'Req_To',
        select: 'Name email_id College'
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