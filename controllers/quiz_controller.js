var models = require('../models/models.js');

//AUTOLOAD
exports.load = function(req, res, next, quizId) {
	console.log('quizId:' + quizId);
	models.Quiz.findById(quizId).then(function(quiz) {
		if(quiz) {
			req.quiz = quiz;
			next();
		}
		else {
			next(new Error('No existe la pregunta con id ' + quizId + '.'));
		}
	});
}

// GET /quizes
exports.index = function(req, res) {
	if(req.query.search) {
		var search = "%" + req.query.search.toUpperCase().replace(" ", "%") + "%";
		models.Quiz.findAll({ where: ["upper(pregunta) like ?", search], order: "pregunta ASC"}).then(function(quizes) {
			res.render('quizes/index', { quizes: quizes })
		})
		.catch(function(error) {
			next(error);
		});
	}
	else {
		models.Quiz.findAll().then(function(quizes) {
			res.render('quizes/index', { quizes: quizes })
		})
		.catch(function(error) {
			next(error);
		});
	}
}

// GET /quizes/:id
exports.show = function(req, res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', { quiz: req.quiz });
	})
	.catch(function(error){
		console.log(error);
	});
}

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	res.render('quizes/answer', {quiz: req.quiz, respuesta: req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()});
}