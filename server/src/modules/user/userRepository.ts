import db, {type Rows, type Result } from "../../../database/client";

interface User {
	id: number,
	firstname: string,
	lastname: string,
	email: string,
	password: string,
	role: string,
	cv: string,
	address: string
}

const createCandidate = async (user: Partial<User>) => {
	const {firstname, lastname, email, password, cv, address} = user;

	const [result] = await db.query<Result>(
  "INSERT INTO users (firstname, lastname, email, password, role, cv, address) VALUES (?, ?, ?, ?, ?, ?, ?)",
  [firstname, lastname, email, password, "candidate", cv, address]);

	return result.insertId;
}

const readByEmail = async (email: string) => {
	const [[rows]] = await db.query<Rows>("SELECT * FROM users WHERE email = ?", [email]);

	return rows as User;
}

export default {createCandidate, readByEmail};