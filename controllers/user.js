const Users = require('../models/Users');

const getAllUsers = async (req, res) => {
    const allusers = await Users.find({});
    res.status(200).json(allusers);
}

const getUser = async (req, res) =>{
    const user = await Users.find({_id:req.params.id});
    if (!user){
        res.status(404).send('User not found')
    }
    res.json(user);
}

const editUser = async (req, res) =>{
    const user = await Users.findOneandUpdate({id:req.params.id}, req.body)
    if (!user){
        res.status(404).send('User not found')
    }
    res.json(user);
}

const eventUser = async (req, res) =>{
    const user = await Users.find({Events_Participated : req.params.event})
    if (!user){
        res.status(404).send('User not found')
    }
    res.json(user);
}

module.exports = {getAllUsers, getUser, editUser, eventUser}

