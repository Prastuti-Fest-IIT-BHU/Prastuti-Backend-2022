//Request controller

const Requests = require('../models/Requests');
const Users = require('../models/Users');
const Teams = require('../models/Teams');

const getRequest = async (req, res) => {
    const request = await Requests.findById(req.params.id);
    res.json({
        request
    })
}

const deleteRequest = async (req, res) =>{
    await Requests.findByIdAndDelete(req.body.requestId);
    res.json({
        message: 'Request Deleted'
    })
}

const sendRequest = async (req, res) => {
    try {
        const request = await Requests.findOne({
            For_Team: req.body.team_id,
            Req_To: req.body.recepient_email
        });
        if(request) {
            res.json({
                message: 'Request has been already sent'
            })
            return;
        }
        
        const user = await Users.findOne({email_id: req.body.recepient_email});
        const team = await Teams.findOne({_id: req.body.team_id});

        if (!team || !user){
            res.status(404).send('Team or user not found.');
        }

        if (team.Member_Count < 3) {
            //Save a new request to the database
            const request = new Requests({
                For_Team: req.body.team_id,
                Req_to: user._id,
                Req_From: req.body.user_id
            });
            request.save();
            
            //Add request to team
            
            team.Pending_Requests.push(request._id);
            const updatedTeam = await Teams.findByIdAndUpdate(req.body.team_id, {
                Pending_Requests: team.Pending_Requests
            }, {
                new: true
            })

            //Add request to user

            user.Pending_Requests.push(request._id);
            await Users.findByIdAndUpdate(user._id, {
                Pending_Requests: user.Pending_Requests
            })

            res.json({
                message: 'Request sent succesfully',
                updatedTeam,
                request
            })
        }
        else {
            res.json({
                message: 'Team already full'
            })
        }
    }    
    catch(err) {
        console.log(err);
        res.json({
            message: 'Error'
        })
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

module.exports = {deleteRequest, sendRequest, acceptRequest, getRequest}