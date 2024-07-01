const tables = require("../../database/tables");

const addSkill = async (req, res, next) => {
  try {
    const [result] = await tables.user.addSkill(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {addSkill};