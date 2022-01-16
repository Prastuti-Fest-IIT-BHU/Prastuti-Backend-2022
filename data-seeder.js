const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const userModel = require('./models/Users');
const eventModel = require('./models/Events');
const teamModel = require('./models/Teams');
const requestModel = require('./models/Requests');

const users = [
    {
        Name: "Jon Doe",
        email_id: "john@gmail.com",
        College: "IIT BHU",
        Phone: 1234567890,
        Events_Participated: ["61e41bb0c8cc613d0382785a", "61e41bb0c8cc613d0382785f"],
        Teams: [],
        Pending_Requests: []
    },
    {
        Name: "Jane Doe",
        email_id: "jane@gmail.com",
        College: "IIT Delhi",
        Phone: 1234567890,
        Events_Participated: ["61e41bb0c8cc613d0382785e", "61e41bb0c8cc613d0382785a"],
        Teams: [],
        Pending_Requests: []
    },
    {
        Name: "Will Smith",
        email_id: "will@gmail.com",
        College: "IIT BHU",
        Phone: 1234567890,
        Events_Participated: ["61e41bb0c8cc613d0382785b", "61e41bb0c8cc613d0382785e"],
        Teams: [],
        Pending_Requests: []
    },
    {
        Name: "Peter Drury",
        email_id: "peter@gmail.com",
        College: "BITS Pilani",
        Phone: 1234567890,
        Events_Participated: ["61e41bb0c8cc613d0382785d", "61e41bb0c8cc613d0382785b"],
        Teams: [],
        Pending_Requests: []
    },
    {
        Name: "Alan Tyler",
        email_id: "alan@gmail.com",
        College: "VIT Vellore",
        Phone: 1234567890,
        Events_Participated: ["61e41bb0c8cc613d0382785c", "61e41bb0c8cc613d0382785d"],
        Teams: [],
        Pending_Requests: []
    }
]

const events = [
    {
        Name: "Simulim",
        Team_Event: true,
        Participants: [],
        Teams: []
    },
    {
        Name: "Codigo",
        Team_Event: false,
        Participants: [],
        Teams: []
    },
    {
        Name: "Recognizance",
        Team_Event: false,
        Participants: [],
        Teams: []
    },
    {
        Name: "Cryptex",
        Team_Event: false,
        Participants: [],
        Teams: []
    },
    {
        Name: "Consilium",
        Team_Event: false,
        Participants: [],
        Teams: []
    },
    {
        Name: "Hackathon",
        Team_Event: true,
        Participants: [],
        Teams: []
    }
]

const teams = [
    {
        Team_Name: "Team 1",
        Events: ["Hackathon", "Recognizance"],
        Members: ["61e41747c661f5fc801e71e9", "61e41747c661f5fc801e71eb"],
        Member_Count: 2
    }
]
const requests = []

const populateUsers = async () => {
    users.forEach(async (user) => {
        await userModel.create(user);
        console.log(`Added user ${user.Name}`);
    })
}

const populateEvents = async () => {
    events.forEach(async (event) => {
        await eventModel.create(event);
        console.log(`Added user ${event.Name}`);
    })
}

const populateTeams = async () => {
    teams.forEach(async (team) => {
        await teamModel.create(team);
        console.log(`Added team ${team.Team_Name}`);
    })
}

const deleteUsers = async () => {
    await userModel.deleteMany({});
    console.log('Deleted all users');
}

const deleteEvents = async () => {
    await eventModel.deleteMany({});
    console.log('Deleted all events');
}

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Successfully connected to database');
    // populateUsers();
    // deleteUsers();
    // populateEvents();
    // deleteEvents();
    // populateTeams();
})