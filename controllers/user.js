const userModel = require('../models/Users');
const eventModel = require('../models/Events');

const getAllUsers = async (req, res) => {
    const allusers = await userModel.find({});
    res.status(200).json(allusers);
}

const getAllUsersEmail = async (req, res) => {
    const allUsers = await userModel.find({});
    let userEmails = allUsers.map(user => {
        return user.email_id;
    })
    res.status(200).json({
        data: userEmails
    })
}

const getUser = async (req, res) =>{
    const user = await userModel.find({_id:req.params.id});
    if (!user){
        res.status(404).send('User not found')
    }
    res.json(user);
}

const editUser = async (req, res) =>{
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id , req.body, {
            new: true
        });
        res.json(user);
    }
    catch(err) {
        console.log(err);
    }
}

const eventUser = async (req, res) => {
    const event = await eventModel.findOne({
        Name: req.params.event
    });
    if(!event) {
        res.status(404).json({
            message: 'Event not found'
        });
    }
    let data;
    if(event.Team_Event) data = event.Teams;
    else data = event.Participants;
    res.status(200).json({
        data
    })
}

module.exports = {getAllUsers, getUser, editUser, eventUser, getAllUsersEmail}

