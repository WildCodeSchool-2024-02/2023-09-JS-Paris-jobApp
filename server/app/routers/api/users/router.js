const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {add, addSkill} = require("../../../controllers/userActions");

router.post("/", add);
router.post("/skill", addSkill);

/* ************************************************************************* */

module.exports = router;
