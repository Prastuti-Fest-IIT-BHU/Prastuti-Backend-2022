const Event = require('../models/Events');
const Users = require('../models/Users');

const getEventLeaderboard = async(req, res) => {
    const eventName = req.params.event;
    const event = await Event.findOne({Name : eventName});
    if (eventName == /* Individual Events */ 'x') {
        event.Participants.sort({Score: desc});
        res.json(event);
    }
    else{
        event.Teams.sort({Score:desc});
        res.json(event);
    }
}

const getLeaderboard = async (req, res) =>{
    const users = await Users.sort({Score:desc});
    res.json(users);
}

module.exports = {getEventLeaderboard, getLeaderboard};