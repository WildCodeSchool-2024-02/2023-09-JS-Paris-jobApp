import databaseClient from "../../../database/client";
import type { Rows, Result } from "../../../database/client";

type Offer = {
  id: number;
  title: string;
  description: string;
  location: string;
  company: string;
  date_of_creation: string;
  status: "open" | "closed";
  users_id: number;
  skills: string[];
};

type Candidate = {
  id_offer: number;
  id_candidate: number;
};

export interface Queries {
  include?: string;
  page?: string;
  limit?: string;
}

class OfferRepository {
  // 🔍 Lire toutes les offres avec leurs compétences
  async readAll(idUser: number, queries?: Queries) {
    const paginate = `${queries?.page && queries?.limit ? `LIMIT ${queries.limit} OFFSET ${(Number(queries.page) - 1) * Number(queries.limit)}` : ""}`;
    if (queries?.include) {
      const [rows] = await databaseClient.query(
        `SELECT o.*, GROUP_CONCAT(s.name) as skills, (SELECT user_offer_favorites.offer_id FROM user_offer_favorites WHERE user_offer_favorites.offer_id = o.id AND user_offer_favorites.user_id = ? GROUP BY user_offer_favorites.offer_id) as favorites FROM offers o LEFT JOIN offer_skills os ON os.id_offer = o.id LEFT JOIN skills s ON s.id = os.id_skill GROUP BY o.id, o.title, o.description, o.company, o.location, o.date_of_creation, o.status, o.users_id ${paginate}`,
        [idUser],
      );

      return rows as Offer[];
    }

    const [rows] = await databaseClient.query(
      `SELECT o.*, (SELECT user_offer_favorites.offer_id FROM user_offer_favorites WHERE user_offer_favorites.offer_id = o.id AND user_offer_favorites.user_id = ? GROUP BY user_offer_favorites.offer_id) as favorites FROM offers o ${paginate}`,
      [idUser],
    );

    return rows as Offer[];
  }

  // 🔍 Lire une offre par ID avec ses compétences
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT o.*, GROUP_CONCAT(s.name) as skills FROM offers o LEFT JOIN offer_skills os ON os.id_offer = o.id LEFT JOIN skills s ON os.id_skill = s.id LEFT JOIN users u ON o.users_id = u.id WHERE o.id = ? GROUP BY o.id, o.title, o.description, o.company, o.location, o.date_of_creation, o.status, o.users_id",
      [id],
    );

    return rows[0] as Offer;
  }

  async candidate(idOffer: number, idCandidate: number) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO candidates (id_offer, id_candidate) VALUES (?, ?)",
      [idOffer, idCandidate],
    );

    return result?.affectedRows;
  }

  async readCandidateByUserAndOffer(idOffer: number, idCandidate: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * from candidates WHERE id_offer = ? AND id_candidate = ?",
      [idOffer, idCandidate],
    );

    return rows[0] as Candidate;
  }

  async readAllByUserId(idUser: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT offers.* from offers JOIN user_offer_favorites ON user_offer_favorites.offer_id = offers.id WHERE user_offer_favorites.user_id = ?",
      [idUser],
    );

    return rows as Offer[];
  }

  async addFavorite(idUser: number, idOffer: number) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user_offer_favorites (user_id, offer_id) VALUES (?, ?)",
      [idUser, idOffer],
    );

    return result.affectedRows;
  }

  async deleteFavorite(idUser: number, idOffer: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM user_offer_favorites WHERE user_id = ? AND offer_id = ?",
      [idUser, idOffer],
    );

    return result.affectedRows;
  }
}

export default new OfferRepository();
