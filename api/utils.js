const { viewCartById } = require("../db/cart");

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
  if (!req.headers.authorization) {
    res.send({
      message: "You must be logged in to perform this action",
      error: "Any<String>",
      name: "Any<String>",
    });
  }
  next();
}

async function checkCartAuth(req, res, next) {
  const checkOwner = await viewCartById(req.body.cartId);
  if (req.user.role_id === 1 || checkOwner.user_id === req.user.id) {
    next();
  } else {
    res.send({
      Error: "You are not authorized to view/change this",
    });
  }
}

module.exports = {
  requireAdmin,
  requireIdentity,
  checkCartAuth,
};
