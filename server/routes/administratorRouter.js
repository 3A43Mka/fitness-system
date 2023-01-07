const Router = require('express');
const router = new Router();
const administratorController = require('../controllers/administratorController');

router.post('/', administratorController.add);
router.get('/getAll', administratorController.getAll);
router.get('/:id', administratorController.getById);

module.exports = router;