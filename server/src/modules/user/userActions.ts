import type { RequestHandler } from "express";
import userRepository from "./userRepository";
import argon from "argon2";
import jwt from "jsonwebtoken";

const add: RequestHandler = async (req, res, next) => {
	try {
		const user = req.body;
		console.log(user);
		
		const hashedPassword = await argon.hash(user.password);
		user.password = hashedPassword;
		const newUserId = await userRepository.createCandidate(user);
		if (newUserId) res.sendStatus(201);
		else res.sendStatus(400);
	} catch (error) {
		next(error);
	}
}

const login: RequestHandler = async (req, res, next) => {
	try {
		const {email, password} = req.body;
		const user = await userRepository.readByEmail(email);
		if (!user) res.sendStatus(404);
		else {
			const confirmPassword = await argon.verify(user.password, password);
			if (!confirmPassword) res.sendStatus(400);
			else {
				const token = jwt.sign(
				{ id: user.id, role: user.role },
				process.env.APP_SECRET as string);

				res.json({user, token});
			}
		}
	} catch (error) {
		next(error);
	}
}

const isAuth: RequestHandler = async (req, res, next) => {
	try {
		const bearer = req.headers.authorization;
		if (!bearer) res.sendStatus(401);
		else {
			const token = (bearer as string).split(" ")[1];
			if (!token) res.sendStatus(401);
			else {
				const user = jwt.verify(token, process.env.APP_SECRET as string);
				req.body.user = user;
				next();
			}
		}
	} catch (error) {
		next(error);
	}
}

const isCandidate: RequestHandler = async (req, res, next) => {
	const {user} = req.body;
	if (user.role === "candidate") next();
	else res.sendStatus(403);
}

const isCompany: RequestHandler = async (req, res, next) => {
	const {user} = req.body;
	if (user.role === "company") next();
	else res.sendStatus(403);
}

export default { add, login, isAuth, isCandidate, isCompany };
