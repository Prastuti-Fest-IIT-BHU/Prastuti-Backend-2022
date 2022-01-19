const Event = require('../models/Events');
const Users = require('../models/Users');

const getEventLeaderboard = async(req, res) => {
    const eventName = req.params.event;
    const event = await Event.findOne({Name : eventName});
    if (!event.Team_Event) {
        let data = event.Participants.map(user => {
            return {
                Name: user.participant.Name,
                College: user.participant.College,
                Score: user.Score,
                ProfileImg: user.participant.Profile_Photo
            }
        })
        data.sort((a, b) => (b.Score - a.Score));
        res.status(200).json({
            data,
            teamEvent: false
        });
    }
    else {
        let data = event.Teams.map(Team => {
            let members = Team.team.Members.map(member => member.Name);
            return {
                Name: Team.team.Team_Name,
                Score: Team.Score,
                members
            }
        })
        data.sort((a, b) => (b.Score - a.Score));
        res.status(200).json({
            data,
            teamEvent: true
        });
    }
}

const getLeaderboard = async (req, res) =>{
    const users = await Users.find({})
    .sort('-Total_Score')
    .select('-Pending_Requests -_id -email_id -__v -Teams -Phone');

    let data = users.map(user => {
        return {
            Name: user.Name,
            Score: user.Total_Score,
            College: user.College,
            NumEvents: user.Events_Participated.length
        }
    })
    res.status(200).json({data});
}

module.exports = {getEventLeaderboard, getLeaderboard};