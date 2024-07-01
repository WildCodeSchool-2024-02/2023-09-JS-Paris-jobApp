const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const authRouter = require("./auth/router");
const itemsRouter = require("./items/router");
const userRouter = require("./users/router");
const skillRouter = require("./skills/router");
const offerRouter = require("./offers/router");

router.use("/auth", authRouter);
router.use("/items", itemsRouter);
router.use("/users", userRouter);
router.use("/skills", skillRouter);
router.use("/offers", offerRouter);

/* ************************************************************************* */

module.exports = router;
