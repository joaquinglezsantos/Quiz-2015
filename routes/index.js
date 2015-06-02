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

//GESTION DE QUIZES
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module.exports = router;