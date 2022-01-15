//Request controller

const Requests = require('../models/Requests');
const Users = require('../models/Users');
const Teams = require('../models/Teams');

const deleteRequest = async (req, res) =>{
    Request.deleteOne({_id:req.body.requestId});
}

const sendRequest = async (req, res) =>{    
    const user = await Users.find({_id: req.body.user_id});
    const team = await Teams.find({_id: req.body.team_id});

    if (team.Member_count < 3){
        //Save a new request to the database
        const request = new Requests({
            For_team: req.body.team_id,
            Req_to: req.body.user_email
        });
        request.save();
    
        if (!team || !user){
            res.status(404).send('Team or user not found.');
        }
        
        //Add request to team
        
        team.Pending_Request = team.Pending_Request.concat([{
            type: request._id
        }]);

        //Add request to user

        user.Pending_Request = user.Pending_Request.concat([{
            type: request._id
        }]);
    }
};

const acceptRequest = async (req, res) =>{
    const team = await Teams.find({_id: req.body.team_id});
    const user = await Users.find({_id: req.body.user_id});

    if (team.Member_count >= 3){
        Request.deleteMany({For_team: team._id});
    }

    else {
          //Add member to team

        team.Members = team.Members.concat([{
            type: user._id
        }]);

        //Increment the member count by 1

        team.Member_count += 1;

        //Add team to member (user)

        user.Team = user.Team.concat([{
            type: user._id
        }]);

        //Delete the pending request for team and user

        user.Pending_Request = user.Pending_Request.filter(function(id){
            return id.type != req.body.request_id;
        });

        team.Pending_Request = team.Pending_Request.filter(function(id){
            return id.type != req.body.request_id;
        })

        Request.deleteOne({_id: req.body.request_id});
    }
}

module.exports = {deleteRequest, sendRequest, acceptRequest}