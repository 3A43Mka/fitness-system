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

}


module.exports = new TrainerController();