const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const register = async (req, res, next) => {
  try {
    const hash = await argon2.hash(req.body.password);
    req.body.password = hash;
    const [result] = await tables.user.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const [[user]] = await tables.user.findByEmail(req.body.email);
    if (user) {
      if (await argon2.verify(user.password, req.body.password)) {
        
        const token = jwt.sign(
          { id: user.id, role: user.role },
          process.env.APP_SECRET,
          { expiresIn: "1h" }
        );
        const refreshToken = jwt.sign(
          { id: user.id, role: user.role },
          process.env.APP_SECRET,
          {
            expiresIn: "1d",
          }
        );

        delete user.password;

        res
          .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "none",
          })
          .header("Authorization", token)
          .json(user);
      } else res.status(400).json("wrong credentials");
    } else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).send("Access Denied. No refresh token provided.");
    }

    const decoded = jwt.verify(refreshToken, process.env.APP_SECRET);
    const accessToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.APP_SECRET, {
      expiresIn: "1h",
    });

    const [[user]] = await tables.user.read(decoded.id);
    delete user.password;

    return res.header("Authorization", accessToken).json(user);
  } catch (error) {
    return next(error);
  }
};

const logout = async ({res}) => {
  res.clearCookie("refreshToken").sendStatus(200);
}

module.exports = { register, login, refresh, logout };
