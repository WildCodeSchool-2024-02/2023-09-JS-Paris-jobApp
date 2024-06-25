const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { getOfferApplicationByUser } = require("../../../controllers/offerActions");

// Import middlewares
const {isAuth} = require("../../../services/auth");

router.get("/candidates", isAuth, getOfferApplicationByUser)

/* ************************************************************************* */

module.exports = router;
