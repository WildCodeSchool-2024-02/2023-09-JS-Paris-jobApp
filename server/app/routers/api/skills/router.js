const router = require("express").Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { add } = require("../../../controllers/skillActions");

router.post("/", add);

/* ************************************************************************* */

module.exports = router;
