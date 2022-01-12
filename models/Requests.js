const mongoose = require('mongoose');

const ReqSchema = mongoose.Schema({
    For_Team : {
        type : {type : Schema.Types.ObjectId, ref : 'team'},
        required : true
    },
    Req_to : {
        type : {type : mongoose.Schema.Types.ObjectId, ref : 'user'},
        required : true
    }
})

const RemoveRef = ()=> {
    ReqSchema.pre('remove', async function(next) {
    await this.model('Users').remove({ Pending_Requests : this._id});
    await this.model('Teams').remove({ Pending_Requests : this._id}, next);})
}

module.exports = RemoveRef
mongoose.exports = mongoose.model('request', ReqSchema);