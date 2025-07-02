import databaseClient from "../../../database/client";
import type { Rows, Result } from "../../../database/client";
import type { User } from "../../types/express";

const add = async (user: Partial<User>) => {
	const {firstname, lastname, email, password, role, cv, address} = user;
  const [result] = await databaseClient.query<Result>(
    "INSERT INTO users (firstname, lastname, email, password, role, cv, address) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [firstname, lastname, email, password, role, cv, address]
  );

	return result.affectedRows;
};

const readByEmail = async (email: string) => {
	const [rows] = await databaseClient.query<Rows>("SELECT * FROM users WHERE email = ?", [email]);

	return rows[0] as User;
}

export default {add, readByEmail};