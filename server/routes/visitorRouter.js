const Router = require('express');
const router = new Router();
const visitorController = require('../controllers/visitorController');

router.post('/', visitorController.add);
router.get('/getAll', visitorController.getAll);
router.put('/setTrainer/:visitorId', visitorController.setTrainer);
router.put('/setDetails/:visitorId', visitorController.setDetails);
router.put('/addToBalance/:visitorId', visitorController.addToBalance);
router.patch('/goToTraining/:visitorId', visitorController.goToTraining);

module.exports = router;