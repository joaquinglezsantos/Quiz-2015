﻿// GET /quizes/question
exports.question = function(req, res) {
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
}

// GET /quizes/answer
exports.answer = function(req, res) {
	res.render('quizes/answer', {respuesta: req.query.respuesta.toUpperCase() === 'Roma'.toUpperCase() ? true : false});
}