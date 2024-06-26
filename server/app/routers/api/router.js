const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./items/router");
const userRouter = require("./users/router");
const skillRouter = require("./skills/router");

router.use("/items", itemsRouter);
router.use("/users", userRouter);
router.use("/skills", skillRouter);

/* ************************************************************************* */

module.exports = router;
