const Router = require('express');
const router = new Router();
const trainerController = require('../controllers/trainerController');

router.post('/', trainerController.add);

module.exports = router;