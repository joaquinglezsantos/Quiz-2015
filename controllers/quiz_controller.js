var models = require('../models/models.js');

//AUTOLOAD
exports.load = function(req, res, next, quizId) {
	/*
	models.Quiz.findById(quizId).then(function(quiz) {
		if(quiz) {
			req.quiz = quiz;
			next();
		}
		else {
			next(new Error('No existe la pregunta con id ' + quizId + '.'));
		}
	});
	*/
	models.Quiz.find({
		where: {id: Number(quizId)},
		include: [{model: models.Comment}]
	}).then(function(quiz) {
		if(quiz) {
			req.quiz = quiz;
			next();
		}
		else {
			next(new Error('No existe la pregunta con id ' + quizId + '.'));
		}
	}).catch(function(err) {
		next(err);
	});
}

// GET /quizes
exports.index = function(req, res) {
	if(req.query.search) {
		var search = "%" + req.query.search.toUpperCase().replace(" ", "%") + "%";
		console.log(search);
		models.Quiz.findAll({ where: ["upper(pregunta) like ?", search], order: "pregunta ASC"}).then(function(quizes) {
			res.render('quizes/index', { quizes: quizes, errors: [] })
		})
		.catch(function(error) {
			next(error);
		});
	}
	else {
		models.Quiz.findAll().then(function(quizes) {
			res.render('quizes/index', { quizes: quizes, errors: [] })
		})
		.catch(function(error) {
			next(error);
		});
	}
}

// GET /quizes/:id
exports.show = function(req, res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', { quiz: req.quiz, errors: [] });
	})
	.catch(function(error){
		console.log(error);
	});
}

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	res.render('quizes/answer', {quiz: req.quiz, respuesta: req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase(), errors: []});
}

// GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build({
		pregunta: "", 
		respuesta: ""
	});
	res.render('quizes/new', {quiz: quiz, errors: []});
}

// POST /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err) {
		if(err) {
			res.render('quizes/new', {quiz: quiz, errors: err.errors});
		}
		else {
			quiz.save({fields:["pregunta", "respuesta", "tema"]}).then(function() {
				res.redirect('/quizes');
			});
		}
	});
}

// GET /quizes/:id/edit
exports.edit = function(req, res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz) {
		res.render('quizes/edit', {quiz: quiz, errors: []});
	});
}

// PUT /quizes/:id
exports.update = function(req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;
	
	req.quiz.validate().then(function(err) {
		if(err) {
			res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
		}
		else {
			req.quiz.save({fields:["pregunta", "respuesta", "tema"]}).then(function() {
				res.redirect('/quizes');
			}).catch(function(err) {console.log(err)});
		}
	});
}

// DELETE /quizes/:id
exports.destroy = function(req, res) {
	req.quiz.destroy().then(function() {
		res.redirect('/quizes');
	}).catch(function(err) {next(err)});
}