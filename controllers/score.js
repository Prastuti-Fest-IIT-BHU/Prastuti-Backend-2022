const Users = require('../models/Users');
const Events = require('../models/Events');
const Team = require('../models/Teams');


const score_solo = async (req,res) => {
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

const score_team = async (req,res) => {
    const { eventName, score } = req.body;
    events_participated = [... Teams.Events];
    new event_present = events_participated.find(val => val.values==eventName)
    if (event_present) {
        await events_partcipated.forEach(element => {
            if (element.Event_Name==eventName) {
                element.Event_Score+=score;
            }
        });

        const team = await Teams.find({_id:req.body.team_id})
        await team.Members.forEach(element => {
            element.Total_Score = Total_Score + score,
            element.Events_Participated = events_partcipated
        });
    }
    else{
        res.status(404).send('No Such Event Available')
    }



}

module.exports = {
    score_solo,
    score_team
}