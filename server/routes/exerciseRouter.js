const Router = require('express');
const router = new Router();
const exerciseController = require('../controllers/exerciseController');

router.post('/', exerciseController.add);
router.get('/getAll', exerciseController.getAll);
router.get('/:id', exerciseController.getById);

module.exports = router;