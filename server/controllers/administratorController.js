const {Administrator} = require('../models/models');

class AdministratorController {
  async add(req, res) {
    try {
      const {fullname, email, phone} = req.body;
      const newAdmin = await Administrator.create({fullname, email, phone});
      return res.json(newAdmin);
    } catch (e) {
      res.status(500).json({error: e});
    }
  }


}


module.exports = new AdministratorController();