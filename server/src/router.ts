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

router.get("/api/offers", offerActions.browse);
router.get("/api/offers/:id", offerActions.read);
router.post("/api/offers/:id/candidate", offerActions.addCandidate);

/* ************************************************************************* */

export default router;
