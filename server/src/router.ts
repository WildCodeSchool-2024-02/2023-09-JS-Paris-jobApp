import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import offerActions from "./modules/offer/offerActions";
import userActions from "./modules/user/userActions";

router.get("/api/offers", userActions.isAuth, offerActions.browse);
router.get("/api/offers/:id", userActions.isAuth, offerActions.read);
router.post("/api/offers/:id/favorite", userActions.isAuth, offerActions.addFavorite);
router.delete("/api/offers/:id/favorite", userActions.isAuth, offerActions.deleteFavorite);
router.post("/api/offers/:id/candidate", userActions.isAuth, userActions.isCandidate, offerActions.addCandidate);


router.post("/api/users", userActions.validate, userActions.create);
router.get("/api/users/:id/favorites", userActions.isAuth, userActions.browseOffersFavorites);
router.post("/api/users/login", userActions.login);

/* ************************************************************************* */

export default router;
