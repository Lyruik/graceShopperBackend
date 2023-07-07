const client = require("./client");
const { getMerchById } = require("./merch");
const { getTreatById } = require("./treats");

async function addToCart({ userId, productType, productId, quantity }) {
  console.log("bro why");
  try {
    const response = await client.query(
      `
        INSERT INTO cart (user_id, product_type, product_id, quantity) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `,
      [userId, productType, productId, quantity]
    );
    console.log(response.rows);
    return response.rows;
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
      SELECT * FROM cart WHERE user_id = $1
        `,
      [userId]
    );
    console.log("elll");
    return response.rows;
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
};
