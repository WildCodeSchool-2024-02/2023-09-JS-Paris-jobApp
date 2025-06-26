import type { RequestHandler } from "express";
import offerRepository, { type Queries } from "./offerRepository";

// 🔍 Toutes les offres
const browse: RequestHandler = async (req, res, next) => {
  try {
    const queries = req.query as unknown as Queries;
    const offers = await offerRepository.readAll(queries);
    res.json(offers);
  } catch (err) {
    next(err);
  }
};

// 🔍 Détail d'une offre
const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const offer = await offerRepository.read(id);

    if (!offer) {
      res.sendStatus(404);
    } else {
      res.json(offer);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
