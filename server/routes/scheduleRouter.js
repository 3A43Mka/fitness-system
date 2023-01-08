const Router = require('express');
const router = new Router();
const scheduleController = require('../controllers/scheduleController');

router.post('/createDayOfExercises', scheduleController.createDayOfExercises);
router.get('/getDaySchedule/:dayId', scheduleController.getDaySchedule);
router.post('/addDayToSchedule', scheduleController.addDayToSchedule);
router.get('/getVisitorSchedule/:id', scheduleController.getVisitorSchedule);

module.exports = router;