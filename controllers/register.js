const Users = require('../models/Users');
const Events = require('../models/Events');
const Team = require('../models/Teams');

const register_solo = async (req,res) =>{
    const user = await Users.findById(req.body.user_id);
    const event = await Events.findById(req.body.event_id);

    if (!user || !event){
        return res.status(404).json({
            message: 'User or event not found'
        })
        return;
    }

    // Check if already registered
    const eventFound = user.Events_Participated.find(e => e.Name === event.Name);
    if(eventFound) {
        res.json({
            message: 'User already registered for this event'
        })
        return;
    }
    
    //Add event in User
    user.Events_Participated = user.Events_Participated.push(event._id);
    
    //Add User in Event
    event.Participants = event.Participants.push({
        participant : user._id,
        Score : 0
    });
    
    //Increment no. of participants
    event.Participants_Count = event.Participants_Count + 1;
    
    // Updating in DB
    const updatedUser = await Users.findByIdAndUpdate(req.body.user_id,{
        Events_Participated:user.Events_Participated
    }, {new:true});
    const updatedEvent = await Events.findByIdAndUpdate(req.body.event_id, {
        Participants:event.Participants,
        Participants_Count:event.Participants_Count
    }, {new : true});
    res.status(201).json({message : "Registered Successfully"});
}

const register_team = async (req,res) =>{
    const team = await Team.findById(req.body.team_id);
    const event = await Events.findById(req.body.event_id);

    if (!team || !event){
        return res.status(404).send('Team or event not found')
    }

    // Check if Team Event
    if (event.Name == "Codigo" || event.Name == "Recognizance" || event.Name == "Cryptex" || event.Name == "Consilium") {
        res.status(403).send('Not a team event');
    }

    // Check if already registered
    team.Events.forEach(element => {
        if (element == event.Name) {
            return res.status(409).send('Already Registered');
        }
    });
    
    //Add team in Event
    event.Teams = event.Teams.concat([{
        team : team._id,
        Score : 0
    }]);

    //Increment Participant count by Team Size
    event.Participants_Count = event.Participants_Count + team.Members.length;
    
    //Add Event in all Users
    const members = team.Members;
    for(let i=0 ; i< members.length; i++){
        /* Add Event to every User */
    }

    //Add Event in Team
    team.Events = team.Events.concat([event.Name]);

    Updating in DB
    const updatedTeam = await Team.findByIdAndUpdate(req.body.team_id, {
        Events: team.Events
    },{new: true});
    const updatedEvent = await Events.findByIdAndUpdate(req.body.event_id, {
        Teams:event.Teams,
        Participants_Count:event.Participants_Count
    }, {new : true});

    res.status(201).json({message: "Team registered successfully", data: {updatedTeam, updatedEvent}});
}

module.exports = {
    register_solo,
    register_team
}