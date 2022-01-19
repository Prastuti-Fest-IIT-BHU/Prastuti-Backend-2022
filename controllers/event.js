const eventModel = require('../models/Events');

const getAllEvents = async (req, res) => { 
    const events = await eventModel.find({});
    res.status(200).json({
        events
    })
}

const getEvent = async (req, res) => {
    const event = await eventModel.findById(req.params.id);
    res.status(200).json({
        event
    })
}

module.exports = {getAllEvents, getEvent};