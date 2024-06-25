const tables = require("../../database/tables");

const getOfferApplicationByUser = async (req, res, next) => {
  try {
    const [offers] = await tables.offer.readOffersApplicationByUser(req.auth.id);
    res.status(200).json(offers);
  } catch (error) {
    next(error);
  }
}

module.exports = {getOfferApplicationByUser};