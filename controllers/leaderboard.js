const Event = require('../models/Events');
const Users = require('../models/Users');

const getEventLeaderboard = async(req, res) => {
    const eventName = req.params.event;
    if (eventName == "Codigo" || eventName == "Recognizance" || eventName == "Cryptex" || eventName == "Consilium") {
        const event = await Event.findOne({Name : eventName})
        .sort('-Participants.Score');
        res.status(200).json({data: event.Participants});
    }
    else {
        const event = await Event.findOne({Name : eventName})
        .sort('-Teams.Score');
        res.status(200).json({data: event.Teams});
    }
}

const getLeaderboard = async (req, res) =>{
    const users = await Users.find({})
    .sort('-Score');
    res.status(200).json({data: users});
}

module.exports = {getEventLeaderboard, getLeaderboard};