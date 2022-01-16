const { events, eventNames } = require('../models/Users');
const Users = require('../models/Users');


const addScore = async (req, res) => {
    const {eventName, score} = req.body;
    events_partcipated = [...Users.Events_Participated];
    const event_present = events_partcipated.find(val => val.Event_Name==eventName)
    if (event_present) {
        await events_partcipated.forEach(element => {
            if (element.Event_Name==eventName) {
                element.Event_Score+=score;
            }
        });
        Users.findOneAndUpdate({_id:req.body.id}, {Score:Score+score, Events_Participated:events_partcipated});
    }
    else{
        events_partcipated.push({Events_Name : eventName, Event_Score : score});
        Users.findOneAndUpdate({_id:req.body.id}, {Score:Score+score, Events_Participated:events_partcipated})
    }
} 

const addTeamScore = async (req, res) => {
    /*  */
} 


module.exports = {addScore, addTeamScore};