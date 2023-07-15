const client = require("./client");

async function createTreat({
  name,
  description,
  category,
  price,
  stock,
  photo,
}) {
  if (!photo) {
    photo =
      "https://loremflickr.com/cache/resized/65535_52162775168_7b6e2bbc9e_z_640_480_nofilter.jpg";
  }
  try {
    const response = await client.query(
      `
        INSERT INTO treats (name, description, category, price, stock, photo) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING name, description, price, stock, photo;
      `,
      [name, description, category, price, stock, photo]
    );
    console.log(response.row);
    return response.rows[0];
  } catch (error) {}
}

async function getTreats() {
  try {
    const response = await client.query(`
            SELECT * FROM treats;
        `);
    return response.rows;
  } catch (error) {}
}

async function getTreatById(treatId) {
  try {
    const response = await client.query(
      `
      SELECT * FROM treats WHERE id = $1
    `,
      [treatId]
    );
    return response.rows[0];
  } catch (error) {}
}

async function getTreatsByCategory(category) {
  try {
    const response = await client.query(
      `
      SELECT * FROM treats WHERE category = $1;
    `,
      [category]
    );
    return response.rows;
  } catch (error) {}
}

async function updateTreat({ id, fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [updatedInfo],
    } = await client.query(
      `
        UPDATE treats
        SET ${setString}
        WHERE id = ${id}
        RETURNING *;
    `,
      Object.values(fields)
    );
    return updatedInfo;
  } catch (error) {}
}

async function deleteTreat(treatId) {
  try {
    const response = await client.query(
      `
            DELETE FROM treats WHERE id = $1
            RETURNING *;
        `,
      [treatId]
    );
    const cartRemoval = await client.query(`
      DELETE FROM cart WHERE product_id = $1 AND product_type = 'treat'
    `);
    return response.rows[0];
  } catch (error) {}
}

module.exports = {
  createTreat,
  getTreats,
  updateTreat,
  deleteTreat,
  getTreatById,
  getTreatsByCategory,
};
