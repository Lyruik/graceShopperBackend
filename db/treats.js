const client = require("./client");

async function createTreat({ name, description, price, stock, photo }) {
  try {
    const response = await client.query(
      `
        INSERT INTO treats (name, description, price, stock, photo) VALUES ($1, $2, $3, $4, $5)
        RETURNING name, description, price, stock, photo;
      `,
      [name, description, price, stock, photo]
    );
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

async function updateTreat({ id, fields }) {
  console.log(fields);
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  console.log(setString);
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
    return response.rows[0];
  } catch (error) {}
}

module.exports = {
  createTreat,
  getTreats,
  updateTreat,
  deleteTreat,
  getTreatById,
};
