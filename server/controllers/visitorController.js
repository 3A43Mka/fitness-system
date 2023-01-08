const {Visitor, Trainer, VisitorDetails} = require('../models/models');

class VisitorController {
  async add(req, res) {
    try {
      const {fullname} = req.body;
      const newVisitor = await Visitor.create({fullname});
      return res.json(newVisitor);
    } catch (e) {
      res.status(500).json({error: e});
    }
  }

  async setTrainer(req, res) {
    try {
      const {visitorId} = req.params;
      const {trainerId} = req.body;
      const updatedVisitor = await Visitor.update(
        { trainerId: trainerId },
        { where: { id: visitorId }, returning: true });
      return res.json(updatedVisitor);
    } catch (e) {
      res.status(500).json({error: e});
    }
  }

  async setDetails(req, res) {
    try {
      const {email, phone, age, weight} = req.body;
      const {visitorId} = req.params;
      const visitor = await Visitor.findOne({ where: {id: visitorId}});
      if (visitor.visitorDetailId) {
        const updatedDetails = await VisitorDetails.update({email, phone, age, weight}, {where: {id: visitor.visitorDetailId}, returning: true});
        return res.json(updatedDetails);
      } else {
        const newDetails = await VisitorDetails.create({email, phone, age, weight});
        const updatedVisitor = await Visitor.update({visitorDetailId: newDetails.id}, { where: {id: visitorId}, returning: true});
        return res.json(updatedVisitor);
      }
    } catch (e) {
      res.status(500).json({error: e});
    }
  }

  async addToBalance(req, res) {
    try {
      const {balance} = req.body;
      const {visitorId} = req.params;
      if (balance < 1) {
        return res.status(400).json({error: "Balance should be positive"});
      }
      const visitor = await Visitor.findOne({where: {id: visitorId}});
      const visitorDetails = await VisitorDetails.findOne({ where: {id: visitor.visitorDetailId}});
      const newBalance = +visitorDetails.balance + +balance;
      const updatedVisitorDetails = await VisitorDetails.update({balance: newBalance}, {where: {id: visitor.visitorDetailId}, returning: true})
      return res.json(updatedVisitorDetails);

    } catch (e) {
      res.status(500).json({error: e});
    }
  }

  async goToTraining(req, res) {
    try {
      const {visitorId} = req.params;
      const visitor = await Visitor.findOne({where: {id: visitorId} });
      const visitorDetails = await VisitorDetails.findOne({where: {id: visitor.visitorDetailId} });
      if (visitorDetails.balance < 1) {
        return res.status(400).json({error: "You don't have any trainings left on  your balance!"});
      }
      const newBalance = +visitorDetails.balance - 1;
      const updatedVisitorDetails = await VisitorDetails.update({balance: newBalance}, {where: {id: visitor.visitorDetailId}, returning: true})
      return res.json(updatedVisitorDetails);

    } catch (e) {
      res.status(500).json({error: e});
    }
  }

}


module.exports = new VisitorController();