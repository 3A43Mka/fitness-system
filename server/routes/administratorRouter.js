const Router = require('express');
const router = new Router();
const administratorController = require('../controllers/administratorController');

router.post('/', administratorController.add);

module.exports = router;