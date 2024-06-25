const AbstractRepository = require("./AbstractRepository");

class OfferRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "item" as configuration
    super({ table: "offers" });
  }
  
  readOffersApplicationByUser(userId) {
    return this.database.query(`select o.* FROM jobApp.${this.table} as o JOIN candidates as c ON o.id = c.id_offer WHERE c.id_candidate = ?`, [userId])
  }
}

module.exports = OfferRepository;
