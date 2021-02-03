import db from "../../src/db";

const postUser = async (req) =>
  new Promise((resolve) => {
    const newUser = db.user.create({
      data: req.body,
    });

    resolve(newUser);
  });

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const newUser = await postUser(req);

      return res.status(201).json(newUser);
    }

    if (req.method === "GET") {
      const users = await db.user.findMany();

      return res.status(200).json(users);
    }

    throw new Error("Cannot find http verb");
  } catch (error) {
    return res.status(400).json(error);
  }
};
