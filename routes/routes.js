const express = require('express');
const res = require('express/lib/response');
const Router = express.Router();

const {getAllUsers, getUser, editUser, eventUser, getAllUsersEmail} = require('../controllers/user'); 
const {getEventLeaderboard, getLeaderboard} = require('../controllers/leaderboard');
const {score_solo, score_team} = require('../controllers/score');
const {deleteRequest, sendRequest, acceptRequest, getRequest} = require('../controllers/request.js');
const {createTeam, getTeam, getTeamNames} = require('../controllers/team');
const { register_solo, register_team } = require('../controllers/register');
const {loginUser} = require('../controllers/login');
const { getAllEvents, getEvent } = require('../controllers/event');

Router.route('/login').post(loginUser);

Router.route('/user/:id').get(getUser).put(editUser);
Router.route('/users').get(getAllUsers);
Router.route('/users/emails/all').get(getAllUsersEmail);
Router.route('/users/:event').get(eventUser);

Router.route('/events').get(getAllEvents);
Router.route('/event/:id').get(getEvent);

Router.route('/teams').get(getTeamNames);
Router.route('/team').post(createTeam);
Router.route('/team/:id').get(getTeam);

Router.route('/request').get(acceptRequest).post(sendRequest).delete(deleteRequest);
Router.route('/request/:id').get(getRequest);

Router.route('/register').post(register_solo);
Router.route('/register/team').post(register_team);

Router.route('/leaderboard').get(getLeaderboard);
Router.route('/leaderboard/:event').get(getEventLeaderboard);

Router.route('/score').post(score_solo);
Router.route('/score/team').post(score_team);

module.exports = Router;