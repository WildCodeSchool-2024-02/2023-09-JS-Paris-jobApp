const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {add, addSkill, login} = require("../../../controllers/userActions");

// Import middlewares
const validateData = require("../../../services/dataValidator");
const userSchema = require("../../../services/validatorSchemas/user");

router.post("/", validateData(userSchema), add);
router.post("/login", login);
router.post("/skill", addSkill);

/* ************************************************************************* */

module.exports = router;
