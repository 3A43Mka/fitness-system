const Router = require('express');
const router = new Router();
const exerciseController = require('../controllers/exerciseController');

router.post('/', exerciseController.add);

module.exports = router;