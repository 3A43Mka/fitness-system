const Router = require('express');
const router = new Router();
const administratorRouter = require('./administratorRouter');
const trainerRouter = require('./trainerRouter');
const visitorRouter = require('./visitorRouter');
const exerciseRouter = require('./exerciseRouter');
const scheduleRouter = require('./scheduleRouter');

router.use('/administrator', administratorRouter);
router.use('/trainer', trainerRouter);
router.use('/visitor', visitorRouter);
router.use('/exercise', exerciseRouter);
router.use('/schedule', scheduleRouter);
// router.use('/user',)
// router.use('/user',)
// router.use('/user',)
// router.use('/user',)
// router.use('/user',)
// router.use('/user',)
// router.use('/user',)

module.exports = router;