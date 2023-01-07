const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Administrator = sequelize.define('administrator', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  fullname: {type: DataTypes.STRING, allowNull: false},
  email: {type: DataTypes.STRING, unique: true, allowNull: false},
  phone: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Trainer = sequelize.define('trainer', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  fullname: {type: DataTypes.STRING, allowNull: false},
  email: {type: DataTypes.STRING, unique: true, allowNull: false},
  phone: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Visitor = sequelize.define('visitor', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  fullname: {type: DataTypes.STRING, allowNull: false},
});

const VisitorDetails = sequelize.define('visitor_details', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true, allowNull: false},
  phone: {type: DataTypes.STRING, unique: true, allowNull: false},
  balance: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
  age: {type: DataTypes.INTEGER},
  weight: {type: DataTypes.INTEGER},
});

const Week = sequelize.define('week', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  day_of_week: {type: DataTypes.STRING, allowNull: false},
});

const Day = sequelize.define('day', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  description: {type: DataTypes.STRING},
});

const DayExercise = sequelize.define('day_exercise', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  order: {type: DataTypes.INTEGER, allowNull: false},
});

const Exercise = sequelize.define('exercise', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false},
});

Administrator.hasMany(Trainer);
Trainer.belongsTo(Administrator);

Trainer.hasMany(Visitor);
Visitor.belongsTo(Trainer);
VisitorDetails.hasOne(Visitor);
Visitor.belongsTo(VisitorDetails);

Visitor.hasMany(Week);
Week.belongsTo(Visitor);

Day.hasMany(Week);
Week.belongsTo(Day);

Day.hasMany(DayExercise);
DayExercise.belongsTo(Day);

Exercise.hasMany(DayExercise);
DayExercise.belongsTo(Exercise);

module.exports = {
  Administrator, Trainer, Visitor, VisitorDetails, Week, Day, DayExercise, Exercise
}
