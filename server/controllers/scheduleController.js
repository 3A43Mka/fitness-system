const {Exercise, DayExercise, Day, Week, Visitor} = require('../models/models');

class ScheduleController {

  async createDayOfExercises(req, res) {
    try {
      const {day, description} = req.body;
      for (let ex of day) {
        if (day.filter(e => e.order === ex.order).length > 1) {
          return res.status(400).json({error: "Order must be unique in a day"});
        }
      }
      const newDay = await Day.create({description});
      const resultDay = {id: newDay.id, description: newDay.description, exercises: []};
      for (let ex of day) {
        const newLink = await DayExercise.create({order: ex.order, dayId: newDay.id, exerciseId: ex.exerciseId});
        resultDay.exercises.push(newLink);
      }
      return res.json(resultDay);
    } catch (e) {
      res.status(500).json({error: e});
    }
  }

  async getDaySchedule(req, res) {
    try {
      const {dayId: dId} = req.params;
      const day = await Day.findOne({where: {id: dId}});
      if (!day) {
        res.status(400).json({error: "No such day"});
      }
      const allLinks = await DayExercise.findAll({ where: {dayId: dId}, include: [{model: Exercise, as: 'exercise', }]});
      return res.json({id: +dId, description: day.description, exercises: allLinks.sort((l1, l2) => l1.order - l2.order)});
    } catch (e) {
      res.status(500).json({error: e});
    }
  }

  async addDayToSchedule(req, res) {
    try {
      const {dayId: dId, visitorId: vId, dayOfWeek} = req.body;
      if ((dId === undefined) || (vId === undefined)) {
        return res.status(400).json({error: "You have to pass day id and visitor id"});
      }
      const day = await Day.findOne({where: {id: dId}});
      if (!day) {
        return res.status(400).json({error: "There is no day by such id"});
      }
      const visitor = await Visitor.findOne({where: {id: vId}});
      if (!visitor) {
        return res.status(400).json({error: "There is no visitor by such id"});
      }
      const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      if (daysOfWeek.indexOf(dayOfWeek) === -1) {
        return res.status(400).json({error: "Day of week should be real"});
      }
      const checkWeekDayAlready = await Week.findOne({ where: {visitorId: vId, day_of_week: dayOfWeek}});
      if (checkWeekDayAlready) {
        await Week.destroy({ where: { visitorId: vId, day_of_week: dayOfWeek } });
      }
      const newWeekDay = await Week.create({visitorId: vId, day_of_week: dayOfWeek, dayId: dId});

      return res.json(newWeekDay);
    } catch (e) {
      res.status(500).json({error: e});
    }
  }

  async getVisitorSchedule(req, res) {
    try {
      const {id: vId} = req.params;
      const visitor = await Visitor.findOne({ where: {id: vId}});
      if (!visitor) {
        return res.status(400).json({error: "There is no visitor by such id"});
      }
      const allWeeks = await Week.findAll({where: {visitorId: vId}, raw: true});
      for (let day of allWeeks) {
        day.day = (await DayExercise.findAll({where: {dayId: day.dayId}, include: [{model: Exercise, as: 'exercise',}]})).sort((l1, l2) => l1.order - l2.order);
      }
      return res.json(allWeeks);
    } catch (e) {
      res.status(500).json({error: e});
    }
  }
}


module.exports = new ScheduleController();