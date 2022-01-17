const Users = require('../models/Users');
const Events = require('../models/Events');
const Team = require('../models/Teams');


const score_solo = async (req,res) => {
    
    res.send("Working Path");
    const {score} = req.body;
    const event = await Events.find({_id:req.body.event_id});
    const user = await Users.find({_id:req.body.user_id});

    //Update total score in user
    user.Total_Score += score;

    //Update score in event's model
    const participant_present = await event.Participants.find({_id: req.body.user_id});
    participant_present.Score += score;
}

const score_team = async (req,res) => {
    res.send("Working Path");
    const { score } = req.body;
    const team = await Team.find({_id:req.body.team_id});

    for(let i=0 ; i< team.Member_Count ; i++){
        team.Members[i].Total_Score += score;
    }   
}



module.exports = {
    score_solo,
    score_team
}