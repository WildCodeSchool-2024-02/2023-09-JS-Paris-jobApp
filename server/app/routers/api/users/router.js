const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {addSkill} = require("../../../controllers/userActions");

router.post("/skill", addSkill);

/* ************************************************************************* */

module.exports = router;
