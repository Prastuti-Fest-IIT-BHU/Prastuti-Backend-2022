const express = require('express');
const res = require('express/lib/response');
const Router = express.Router();

const {getAllUsers, getUser, editUser, eventUser} = require('../controllers/user'); 
const {getEventLeaderboard} = require('../controllers/leaderboard');
const {score_solo, score_team} = require('../controllers/score');
const {register_solo, register_team} = require('../controllers/register');

Router.route('/login').get();

Router.route('/user/:id').get(getUser).put(editUser);
Router.route('/user').get(getAllUsers);
Router.route('/user/:event/all').get(eventUser);

Router.route('/request').get().post().delete();

Router.route('/register').post(register_solo);
Router.route('/register/team').post(register_team);

Router.route('/leaderboard/:event').get(getEventLeaderboard);

Router.route('/score').post(score_solo);
Router.route('/score/team').post(score_team);

module.exports = Router;