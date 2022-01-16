const mongoose = require('mongoose');

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
    Members : {
        type : [{
            type : mongoose.Schema.Types.ObjectId, 
            ref : 'user'
        }],
        required : true
    },
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

// TeamSchema.pre(/^find/, async function(next) {
//     this.populate({
//         path: 'Members',
//         select: 'Name email_id College'
//     });
//     this.populate({
//         path: 'Pending_Requests'
//     })
//     next();
// })

const Team = mongoose.model('team', TeamSchema);
module.exports = Team;