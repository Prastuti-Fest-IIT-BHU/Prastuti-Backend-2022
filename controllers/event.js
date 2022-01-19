const eventModel = require('../models/Events');

const getAllEvents = async (req, res) => { 
    const events = await eventModel.find({});
    res.status(200).json({
        events
    })
}

module.exports = {getAllEvents};