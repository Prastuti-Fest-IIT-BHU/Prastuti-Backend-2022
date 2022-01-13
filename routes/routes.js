const express = require('express');
const res = require('express/lib/response');
const Router = express.Router();

const {getAllUsers, getUser, editUser, eventUser} = require('../controllers/user'); 

Router.route('/login').get();

Router.route('/user/:id').get(getUser).put(editUser);
Router.route('/user/all').get(getAllUsers);
Router.route('/user/:event/all').get(eventUser);

Router.route('/request').get().post().delete();

Router.route('/register').post();
Router.route('/register/team').post();

Router.route('/leaderboard/:event').get();

Router.route('/score').post();
Router.route('/score/team').post();

module.exports = Router;