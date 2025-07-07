import type { RequestHandler } from "express";
import userRepository from "./userRepository";
import argon from "argon2";
import jwt from "jsonwebtoken";
import offerRepository from "../offer/offerRepository";

const create: RequestHandler = async (req, res, next) => {
	try {
		const user = req.body;
		user.password = await argon.hash(user.password);
		const affectedRows = await userRepository.add(user);
		if (affectedRows) res.sendStatus(201);
		else res.sendStatus(422);
	} catch (error) {
		next(error);
	}
}

const validate: RequestHandler = async (req, res, next) => {
	try {
		const { firstname, lastname, email, password, role, cv, address } = req.body;
  if (!firstname || firstname === "" || firstname.length < 4)
    res
      .status(422)
      .json("firstname doit etre définis et faire au moins 4 caractere.");
  else if (!lastname || lastname === "" || lastname.length < 4)
    res
      .status(422)
      .json("lastname doit etre définis et faire au moins 4 caractere.");
	else next();
	} catch (error) {
		next(error);
	}
}

const login : RequestHandler = async (req, res, next) => {
	try {
		const {email, password} = req.body;
		const user = await userRepository.readByEmail(email);
		console.log(user);
		
		if (!user) res.status(422).json("Utilisateur non trouvée.");
		else {
			const confirmPassword = await argon.verify(user.password, password);
			if (!confirmPassword) res.status(422).json("Identifiant incorrect");
			else {
				const token = jwt.sign({id: user.id, role: user.role}, process.env.APP_SECRET as string);
				const {password, ...userWithoutPassword} = user;
				console.log(userWithoutPassword);
				
				res.json({userWithoutPassword, token});
			}
		}
	} catch (error) {
		next(error);
	}
}

const isAuth: RequestHandler = async (req, res, next) => {
	try {
		const authorization = req.headers.authorization;
		if (!authorization) res.status(401).json("Authorization manquante");
		else {
			const token = authorization.split(" ")[1];
			if (!token) res.status(401).json("token manquant.");
			else {
				const payload = jwt.verify(token, process.env.APP_SECRET as string);
				req.body.user = payload;
				next();
			}
		}
	} catch (error) {
		next(error);
	}
}

const isCompany: RequestHandler = async (req, res, next) => {
	const {role} = req.body.user;
	if (role !== "company") res.status(403).json("Vous n'avez pas le bon role pour effectuer cette action.");
	else next();
}

const isCandidate: RequestHandler = async (req, res, next) => {
	const {role} = req.body.user;
	if (role !== "candidate") res.status(403).json("Vous n'avez pas le bon role pour effectuer cette action.");
	else next();
}

const browseOffersFavorites: RequestHandler = async (req, res, next) => {
	try {
		const idUser = Number(req.params.id);
		if (idUser !== req.body.user.id) res.sendStatus(401);
		else {
			const offers = await offerRepository.readAllByUserId(idUser);
			res.json(offers);
		}
	} catch (error) {
		next(error);
	}
}

export default { create, validate, login, isAuth, isCompany, isCandidate, browseOffersFavorites };