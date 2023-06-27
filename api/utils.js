function requireAdmin(req, res, next) {
  if (req.user.role_id !== 1) {
    res.send({
      message: "You must be an admin in to perform this action",
      error: "roleError",
      name: "roleError",
    });
  }
  next();
}
function requireIdentity(req, res, next) {
  if (!req.user.id) {
    res.send({
      message: "You must be logged in to perform this action",
      error: "Any<String>",
      name: "Any<String>",
    });
  }
  next();
}

module.exports = {
  requireAdmin,
  requireIdentity,
};
