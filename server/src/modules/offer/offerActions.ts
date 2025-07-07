import type { RequestHandler } from "express";
import offerRepository, { type Queries } from "./offerRepository";

// 🔍 Toutes les offres
const browse: RequestHandler = async (req, res, next) => {
  try {
		const idUser = req.body.user.id;
    const offers = await offerRepository.readAll(idUser, req.query);
    const totalOffers = await offerRepository.readAll(idUser);
    res.json({ offers, totalOffers: totalOffers.length });
  } catch (err) {
    next(err);
  }
};

// 🔍 Détail d'une offre
const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const offer = await offerRepository.read(id);

    if (!offer) res.sendStatus(404);
    else res.json(offer);
  } catch (err) {
    next(err);
  }
};

const addCandidate: RequestHandler = async (req, res, next) => {
  try {
    const idOffer = Number(req.params.id);
    const idCandidate = req.body.idUser;
    const candidate = await offerRepository.readCandidateByUserAndOffer(
      idOffer,
      idCandidate,
    );

    if (candidate)
      res.status(400).json("Cette utilisateur à déjà candidater à cette offre");
    else {
      const affectedRows = await offerRepository.candidate(
        idOffer,
        idCandidate,
      );
      if (affectedRows > 0) res.sendStatus(201);
      else res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const addFavorite: RequestHandler = async (req, res, next) => {
  try {
    const idOffer = Number(req.params.id);
    const idUser = req.body.user.id;
    const affectedRows = await offerRepository.addFavorite(idUser, idOffer);
    if (!affectedRows) res.sendStatus(404);
    else res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

const deleteFavorite: RequestHandler = async (req, res, next) => {
  try {
    const idOffer = Number(req.params.id);
    const idUser = req.body.user.id;
    const affectedRows = await offerRepository.deleteFavorite(idUser, idOffer);
    if (!affectedRows) res.sendStatus(404);
    else res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, addCandidate, addFavorite, deleteFavorite };
