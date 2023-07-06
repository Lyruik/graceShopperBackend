const client = require("./client");

async function addToCart(userId, productType, productId, quantity) {
  try {
    const response = await client.query(
      `
        INSERT INTO cart (user_id, product_type, product_id, quantity) 
        VALUES ($1, $2, $3, $4);
    `,
      [userId, productType, productId, quantity]
    );
    console.log(response.rows[0]);
    return response.rows;
  } catch (error) {}
}

module.exports = {
  addToCart,
};
