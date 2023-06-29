const client = require("./client");

async function createTreat({ type, price, stock }) {
  try {
    const response = await client.query(
      `
        INSERT INTO treats (type, price, stock) VALUES ($1, $2, $3)
        RETURNING type, price, stock;
      `,
      [type, price, stock]
    );
    return response.rows[0];
  } catch (error) {}
}

async function getTreats() {
  try {
    const response = await client.query(`
            SELECT type, stock, price FROM treats;
        `);
    return response.rows;
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
};
