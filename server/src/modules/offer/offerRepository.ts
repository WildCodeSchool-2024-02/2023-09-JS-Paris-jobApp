import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

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

export interface Queries {
  include?: string;
  page?: string;
  limit?: string;
}

class OfferRepository {
  // 🔍 Lire toutes les offres avec leurs compétences
  async readAll(queries?: Queries) {
    const paginate = `${queries?.limit && `LIMIT ${queries?.limit} OFFSET ${(Number(queries?.page) - 1) * Number(queries?.limit)}`}`;
    if (queries?.include) {
      const [rows] = await databaseClient.query<Rows>(`
				SELECT 
					o.id,
					o.title,
					o.description,
					o.location,
					o.company,
					o.date_of_creation,
					o.status,
					o.users_id,
					(select count(o.id) from offers o) as count,
					GROUP_CONCAT(s.name) AS skills
				FROM offers o
				LEFT JOIN offer_skills os ON o.id = os.id_offer
				LEFT JOIN skills s ON os.id_skill = s.id
				GROUP BY 
					o.id,
					o.title,
					o.description,
					o.location,
					o.company,
					o.date_of_creation,
					o.status,
					o.users_id ${paginate}`);

      return rows as Offer[];
    }
    const [rows] = await databaseClient.query<Rows>(`
		SELECT 
			o.id,
			o.title,
			o.description,
			o.location,
			o.company,
			o.date_of_creation,
			o.status,
			o.users_id FROM offers o ${paginate}`);

    return rows as Offer[];
  }

  // 🔍 Lire une offre par ID avec ses compétences
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
			SELECT 
				o.id,
				o.title,
				o.description,
				o.location,
				o.company,
				o.date_of_creation,
				o.status,
				o.users_id,
				GROUP_CONCAT(s.name) AS skills
			FROM offers o
			LEFT JOIN offer_skills os ON o.id = os.id_offer
			LEFT JOIN skills s ON os.id_skill = s.id
			WHERE o.id = ?
			GROUP BY 
				o.id,
				o.title,
				o.description,
				o.location,
				o.company,
				o.date_of_creation,
				o.status,
				o.users_id
		`,
      [id],
    );

    if (!rows.length) return null;

    const row = rows[0] as Offer;
    return row;
  }
}

export default new OfferRepository();
