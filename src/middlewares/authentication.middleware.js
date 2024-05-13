import jwt from "jsonwebtoken";

export function authenticationMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  console.log("Authorization: ", authorization);

  if (!authorization) {
    return res.status(401).json({ message: "Invalid token." });
  }
  const [, token] = authorization.split(" ");
  if (!token) {
    return res.status(401).json({ message: "Invalid token." });
  }

  try {
    jwt.verify(token, "leon");

    const decoded = jwt.decode(token);

    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token." });
  }
}
