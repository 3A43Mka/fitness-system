const {Exercise, DayExercise, Day, Week} = require('../models/models');

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
      const day = await Day.findOne({id: dId});
      const allLinks = await DayExercise.findAll({ where: {dayId: dId}, include: [{model: Exercise, as: 'exercise', }]});
      return res.json({description: day.description, exercises: allLinks.sort((l1, l2) => l1.order - l2.order)});
    } catch (e) {
      res.status(500).json({error: e});
    }

  }


  async add(req, res) {
    try {
      const {name, description} = req.body;
      const newExercise = await Exercise.create({name, description});
      return res.json(newExercise);
    } catch (e) {
      res.status(500).json({error: e});
    }
  }

  async getAll(req, res) {
    console.log("ABAMA")
    return res.json("acasddssaad")
  }

  async getById(req, res) {

  }

}


module.exports = new ScheduleController();