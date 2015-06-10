﻿var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res) {
	//res.render('quizes/question', {pregunta: 'Capital de Italia'});
	models.Quiz.findAll().then(function(quiz) {
		res.render('quizes/question', {pregunta: quiz[0].pregunta});
	});
}

// GET /quizes/answer
exports.answer = function(req, res) {
	//res.render('quizes/answer', {respuesta: req.query.respuesta.toUpperCase() === 'Roma'.toUpperCase() ? true : false});
	models.Quiz.findAll().then(function(quiz) {
		res.render('quizes/answer', {respuesta: req.query.respuesta.toUpperCase() === quiz[0].respuesta.toUpperCase() ? true : false});
	});
}