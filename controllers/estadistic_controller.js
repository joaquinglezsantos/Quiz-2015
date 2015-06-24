var models = require('../models/models.js');

exports.index = function(req, res, next) {
	models.Quiz.findAll({
		include: [{ model: models.Comment }] 
	}).then(function(quizes) {
		var numPreguntas = quizes.length || 0;
		var numComentariosTotal = 0;
		var numComentariosPregunta = 0;
		var numPreguntasConComentario = 0;
		var numPreguntasSinComentario = 0;
		var mediaComentario = 0;
		for (var i = 0; i < numPreguntas; i++) {
			numComentariosPregunta = 0;
			for(j in quizes[i].Comments) {
				numComentariosTotal += 1;
				numComentariosPregunta += 1;
			}
			if(numComentariosPregunta > 0) { 
				numPreguntasConComentario += 1;
			}
			else {
				numPreguntasSinComentario += 1;
			}
		}
		if(numPreguntas > 0) {
			mediaComentario = (numComentariosTotal / numPreguntas).toFixed(2); 
		}
		res.render('estadistics', {
			numPreguntas :numPreguntas,
			numComentariosTotal: numComentariosTotal,
			numPreguntasSinComentario: numPreguntasSinComentario,
			numPreguntasConComentario: numPreguntasConComentario,
			mediaComentario: mediaComentario,
			errors: []
		});    
	}).catch(function(err) {
		next(err);
	})
};