var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz 2015' });
});

router.get('/author', function(req, res, next) {
  res.render('author', {authors: [{ name: 'Joaquín González Santos', urlphoto: '/images/author.png', urlvideo: 'http://www.html5videoplayer.net/videos/toystory.mp4' }, { name: 'Autor 2', urlphoto: '/images/author_default.png' }]});
});

router.param('quizId', quizController.load);//AUTOLOAD :quizId -> se llama a load si existe quizId en query, body o param

//GESTION DE QUIZES
router.get('/quizes', quizController.index);
router.get('/quizes/quizId(\\d+)', quizController.show);
router.get('/quizes/quizId(\\d+)/answer', quizController.answer);

module.exports = router;