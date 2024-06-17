const tables = require("../../database/tables");

const add = async (req, res, next) => {
  try {
    const [result] = await tables.skill.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { add };
