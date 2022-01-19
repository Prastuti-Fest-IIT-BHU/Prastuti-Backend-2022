const teamModel = require('../models/Teams');
const userModel = require('../models/Users');

const createTeam = async (req, res) => {
    try {
        let user = await userModel.findById(req.body.userID);
        if(!user) {
            res.status(404).json({
                message: 'User not found'
            })
            return;
        }
        const newTeam = await teamModel.create({
            Team_Name: req.body.team_name,
            Events: [],
            Members: [req.body.userID],
            Member_Count: 1,
            Pending_Requests: []
        });
        user.Teams.push(newTeam._id);
        let updateUser = await userModel.findByIdAndUpdate(req.body.userID, {
            Teams: user.Teams
        }, {
            new: true
        })
    
        res.status(200).json({
            message: 'New Team Created',
            data: {
                newTeam,
                updateUser
            }
        })
    }
    catch(err) {
        console.log(err);
        res.json({
            message: 'Error'
        })
    }
}

const getTeam = async (req, res) => {
    try {
        const team = await teamModel.findById(req.params.id);
        res.status(200).json({
            team
        })
    }
    catch(err) {
        console.log(err);
        res.json({
            message: 'Error'
        })
    }
}

module.exports = {createTeam, getTeam}