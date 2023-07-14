const client = require("./client");
const { getMerchById } = require("./merch");
const { getTreatById } = require("./treats");

async function addToCart({ userId, productType, productId, quantity }) {
  try {
    const response = await client.query(
      `
        INSERT INTO cart (user_id, product_type, product_id, quantity) 
        VALUES ($1, $2, $3, $4);
    `,
      [userId, productType, productId, quantity]
    );
    const response2 = await client.query(
      `
      SELECT * FROM cart WHERE user_id = $1;
    `,
      [userId]
    );
    console.log("ehlp");
    return response2.rows;
  } catch (error) {}
}

async function viewCarts() {
  try {
    const response = await client.query(`
      SELECT * FROM cart;
      `);
    return response.rows;
  } catch (error) {}
}

async function viewUserCart(userId) {
  try {
    const response = await client.query(
      `
      SELECT * FROM cart WHERE user_id = $1 AND status = 'active';
        `,
      [userId]
    );
    return response.rows;
  } catch (error) {}
}

async function viewCartById(cartId) {
  try {
    const response = await client.query(
      `
      SELECT * FROM cart WHERE id = $1
    `,
      [cartId]
    );
    if (!response.rows[0]) {
      return false;
    }
    return response.rows[0];
  } catch (error) {}
}

async function deleteFromCart(cartId) {
  try {
    const response = await client.query(
      `
      DELETE FROM cart WHERE id = $1
      RETURNING user_id;
    `,
      [cartId]
    );
    const userId = response.rows[0];
    const response2 = await client.query(
      `
      SELECT * FROM cart WHERE user_id = $1
    `,
      [userId]
    );
    return response2.rows;
  } catch (error) {}
}

async function updateCartItemQuantity(quantity, cartId) {
  try {
    const response = await client.query(
      `
      UPDATE cart SET quantity = $1 WHERE id = $2
      RETURNING *;
    `,
      [quantity, cartId]
    );
    const cart = await client.query(
      `
      SELECT * FROM cart WHERE user_id = $1
    `,
      [response.rows[0].user_id]
    );
    return cart.rows;
  } catch (error) {}
}

async function checkoutCartClear(userId) {
  try {
    const respone = await client.query(
      `
      UPDATE cart SET status = 'purchased' WHERE user_id = $1;
    `,
      [userId]
    );
  } catch (error) {}
}

/* 
      I may want to use this later but keeping it simple for now and making it give cart id on objects instead
async function deleteFromCart(userId, productType, productId) {
  try {
    const response = await client.query(
      `
      DELETE FROM cart WHERE user_id = $1 AND product_type = $2 AND product_id = $3
    `,
      [userId, productType, productId]
    );
    console.log(response.rows[0]);
    return response.rows[0];
  } catch (error) {}
}
*/

module.exports = {
  addToCart,
  viewCarts,
  viewUserCart,
  viewCartById,
  deleteFromCart,
  updateCartItemQuantity,
  checkoutCartClear,
};
