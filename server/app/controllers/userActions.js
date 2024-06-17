const tables = require("../../database/tables");

const add = async (req, res, next) => {
  try {
    const [result] = await tables.user.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

const addSkill = async (req, res, next) => {
  try {
    const [result] = await tables.user.addSkill(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {add, addSkill};