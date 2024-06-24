const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const add = async (req, res, next) => {
  try {
    const hash = await argon2.hash(req.body.password);
    req.body.password = hash;
    const [result] = await tables.user.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

const login = async (req, res, next) => {
  try {
    const [[user]] = await tables.user.findByEmail(req.body.email);
    if (user) {
      if (await argon2.verify(user.password, req.body.password)) {
        const token = jwt.sign({id: user.id, role: user.role}, process.env.APP_SECRET, {expiresIn: "1h"});
        delete user.password;
        res.status(200).json({user, token})
      } else res.status(400).json("wrong credentials");
    } else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const addSkill = async (req, res, next) => {
  try {
    const [result] = await tables.user.addSkill(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {add, addSkill, login};