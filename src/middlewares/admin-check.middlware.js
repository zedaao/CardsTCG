export function adminChckMiddleware(req, res, next) {
  if (req.user.admin) {
    return next();
  }

  return res.json({ message: "Não autorizado" }).status(401);
}
