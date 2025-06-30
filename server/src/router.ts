import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import offerActions from "./modules/offer/offerActions";
import userActions from "./modules/user/userActions";

router.get("/api/offers", userActions.isAuth, offerActions.browse);
router.get("/api/offers/:id", userActions.isAuth, offerActions.read);
router.post("/api/offers/:id/candidate", userActions.isAuth, userActions.isCandidate, offerActions.addCandidate);

router.post("/api/users", userActions.add);
router.post("/api/users/login", userActions.login);

/* ************************************************************************* */

export default router;
