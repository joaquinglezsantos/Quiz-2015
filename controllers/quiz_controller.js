var models = require('../models/models.js');

//AUTOLOAD
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(function(quiz) {
		if(quiz) {
			req.quiz = quiz;
			next();
		}
		else {
			next(new Error('No existe la pregunta con id ' + quizId + '.'));
		}
	})
	.catch(function(error) {
		next(error);
	});
}

// GET /quizes
exports.index = function(req, res) {
	if(req.param.search) {
		models.Quiz.findAll({where: ['pregunta like ?', req.param.search]}).then(function(quizes) {
			res.render('quizes/index', { quizes:quizes })
		})
		.catch(function(error) {
			next(error);
		});
	}
	else {
		models.Quiz.findAll().then(function(quizes) {
			res.render('quizes/index', { quizes:quizes })
		})
		.catch(function(error) {
			next(error);
		});
	}
}

// GET /quizes/:id
exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', { quiz:quiz });
	});
}

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	res.render('quizes/answer', {quiz: req.quiz, respuesta: req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()});
}