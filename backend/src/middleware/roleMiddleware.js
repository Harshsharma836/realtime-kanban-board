module.exports = (req, res, next) => {
  const role = req.headers.role;

  if (req.method !== "GET" && role !== "editor") {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};
