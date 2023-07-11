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

var emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isEmailValid(req, res, next) {
  console.log("ehlp");
  if (!req.body.email) return false;

  if (req.body.email.length > 254) return false;

  var valid = emailRegex.test(req.body.email);
  if (!valid)
    res.send({
      Error: "Please submit a valid email address",
    });

  // Further checking of some things regex can't handle
  var parts = req.body.email.split("@");
  if (parts[0].length > 64) return false;

  var domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;

  return true;
}

module.exports = {
  requireAdmin,
  requireIdentity,
  checkCartAuth,
  isEmailValid,
};
