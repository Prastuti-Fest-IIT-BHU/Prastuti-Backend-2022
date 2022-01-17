const Users = require('../models/Users');
const Events = require('../models/Events');
const Team = require('../models/Teams');

const register_solo = async (req,res) =>{

    res.send("Working");
    const user = await Users.find({_id: req.body.user_id});
    const event = await Events.find({_id: req.body.event_id});


    if (!user || !event){
        res.status(404).send('User or event not defined')
    }

    //Add event in User
    user.Events_Participated = user.Events_Participated.concat([{
        Event_Name : event.type
    }]);

    //Add User in Event
    event.Participants = event.Participants.concat([{
        participant : user._id,
        Score : user.Total_Score
    }]);

    //Increment no. of participants
    event.Participants_Count = event.Participants_Count + 1;
}

const register_team = async (req,res) =>{
    const team = await Team.find({_id: req.body.team_id});
    const event = await Events.find({_id: req.body.event_id});


    if (!team || !event){
        res.status(404).send('Team or event not defined')
    }

    
    //Add team in Event
    event.Teams = event.Teams.concat([{
        team : team._id,
        Score : 0
    }]);

    //Increment Participant count by Team Size
    event.Participants_Count = event_Participants_Count + team.Members.length;

    //Add Event in all Users
    const members = team.Members;
    for(let i=0 ; i< members.length; i++){
        members[i].Events_Participated = members[i].Events_Participated.concat([{
            Event_Name : event.type,
        }]);
    }
}

module.exports = {
    register_solo,
    register_team
}