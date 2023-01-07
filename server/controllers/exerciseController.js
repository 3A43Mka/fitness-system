const {Exercise} = require('../models/models');

class ExerciseController {
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


module.exports = new ExerciseController();