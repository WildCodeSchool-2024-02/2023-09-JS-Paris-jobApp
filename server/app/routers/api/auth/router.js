const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { register, login, refresh, logout } = require("../../../controllers/authActions");

// Import middlewares
const validateData = require("../../../services/dataValidator");
const userSchema = require("../../../services/validatorSchemas/user");

router.post("/register", validateData(userSchema), register);
router.post("/login", login);
router.get("/refresh", refresh);
router.get("/logout", logout);

/* ************************************************************************* */

module.exports = router;
