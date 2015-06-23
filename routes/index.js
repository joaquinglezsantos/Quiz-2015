var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz 2015', errors:[] });
});

router.get('/author', function(req, res, next) {
  res.render('author', {authors: [{ name: 'Joaquín González Santos', urlphoto: '/images/author.png', urlvideo: 'http://www.html5videoplayer.net/videos/toystory.mp4' }, { name: 'Autor 2', urlphoto: '/images/author_default.png' }], errors:[]});
});

router.param('quizId', quizController.load);//AUTOLOAD :quizId -> se llama a load si existe en query, body o param

//GESTION DE QUIZES
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

//GESTION DE COMMENTS
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

module.exports = router;