﻿var models = require('../models/models.js');

// GET /login
exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};
	res.render('sessions/new', {errors: errors});
}

// POST /login
exports.create = function(req, res) {
	var login = req.body.login;
	var pwd = req.body.pwd;
	
	var userController = require('./user_controller');
	userController.autenticar(login, pwd, function(err, user) {
		if(err) {
			req.session.errors = [{"message": "Se ha producido un error: " + err}];
			res.redirect('/login');
			return;
		}
		
		req.session.user = {id: user.id, username: user.username};//se crea req.session.user y campos id y username
		res.redirect(req.session.redir.toString());//redirige al path anterior a login
	});
}

// GET /logout
exports.destroy = function(req, res) {
	delete req.session.user;
	res.redirect(req.session.redir.toString());//redirige al path anterior a logout
}