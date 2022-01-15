const express = require('express');
const res = require('express/lib/response');
const Router = express.Router();

const {getAllUsers, getUser, editUser, eventUser} = require('../controllers/user'); 
const {getEventLeaderboard} = require('../controllers/leaderboard');
const {addScore, addTeamScore} = require('../controllers/score');

Router.route('/login').get();

Router.route('/user/:id').get(getUser).put(editUser);
Router.route('/user').get(getAllUsers);
Router.route('/user/:event/all').get(eventUser);

Router.route('/request').get().post().delete();

Router.route('/register').post();
Router.route('/register/team').post();

Router.route('/leaderboard/:event').get(getEventLeaderboard);

Router.route('/score').post(addScore);
Router.route('/score/team').post(addTeamScore);

module.exports = Router;