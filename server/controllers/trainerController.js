const {Trainer} = require('../models/models');

class TrainerController {
  async add(req, res) {
    try {
      const {fullname, email, phone, administratorId} = req.body;
      const newAdmin = await Trainer.create({fullname, email, phone, administratorId});
      return res.json(newAdmin);
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


module.exports = new TrainerController();