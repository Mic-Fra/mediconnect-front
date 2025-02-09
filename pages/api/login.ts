import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  // Replace this with a real database lookup
  if (email === "admin@example.com" && password === "$2b$10$Q4N71Y72vlZ4DROFtXQlBOZkLz55yvDHxnqfszT3J/4IR6qvDvXrK") {
    const token = jwt.sign({ email }, "MY_SECRET_KEY", { expiresIn: "1h" });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ error: "Invalid email or password" });
}
