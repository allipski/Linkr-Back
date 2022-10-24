import * as usersRepository from "../repositories/usersRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function createUser(req, res, next) {
  const { email, password, username, pictureUrl } = req.body;

  const passwordHash = bcrypt.hashSync(password, 12);
  const isUsernameValid = await usersRepository.findUser({ email });

  if (isUsernameValid.rowCount === 1) {
    return res.status(409).send("Email is already taken");
  }

  try {
    await usersRepository.registerUser({
      email,
      passwordHash,
      username,
      pictureUrl,
    });
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await usersRepository.findUser({ email });

    if (user.rowCount === 0) {
      return res
        .status(404)
        .send("Uh you dont have an account :( Please sign up");
    }

    const validPassword = bcrypt.compareSync(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).send("Invalid email or password :(");
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.TOKEN_SECRET, {
      expiresIn: "2d",
    });

    return res.status(200).send({ id: user.rows[0].id, name:user.rows[0].name, token, pictureUrl: user.rows[0].pictureUrl});
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};