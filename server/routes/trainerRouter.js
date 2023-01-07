const Router = require('express');
const router = new Router();
const trainerController = require('../controllers/trainerController');

router.post('/', trainerController.add);
router.get('/getAll', trainerController.getAll);
router.get('/:id', trainerController.getById);

module.exports = router;