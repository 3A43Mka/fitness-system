const Router = require('express');
const router = new Router();
const scheduleController = require('../controllers/scheduleController');

router.post('/createDayOfExercises', scheduleController.createDayOfExercises);
router.get('/getDaySchedule/:dayId', scheduleController.getDaySchedule);

module.exports = router;