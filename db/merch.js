const client = require("./client");

async function createMerch({ id, type, size, color, price }) {
  try {
    const response = await client.query(
      `
        INSERT INTO treats (id, "type", "size", "color", price)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, type, size, color, price;
      `,
      [id, type, size, color, price]
    );

    return response.rows[0];
  } catch (error) {}
}

async function getAllMerch() {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM merch;
      `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getMerchById(id) {
  try {
    const {
      rows: [merch],
    } = await client.query(
      `
      SELECT *
      FROM merch
      WHERE id = $1;
      `,
      [id]
    );

    if (!merch) {
      return null;
    }

    return merch;
  } catch (error) {
    throw error;
  }
}

async function getMerchByType(type) {
  try {
    const {
      rows: [merch],
    } = await client.query(
      `
    SELECT *
    FROM merch
    WHERE type = $1;
    `,
      [type]
    );

    if (!merch) {
      return null;
    }

    return merch;
  } catch (error) {
    throw error;
  }
}

async function getMerchBySize(size) {
  try {
    const {
      rows: [merch],
    } = await client.query(
      `
    SELECT *
    FROM activities
    WHERE size = $1;
    `,
      [size]
    );

    if (!merch) {
      return null;
    }

    return merch;
  } catch (error) {
    throw error;
  }
}

async function getMerchByColor(color) {
  try {
    const {
      rows: [merch],
    } = await client.query(
      `
      SELECT *
      FROM activities
      WHERE color = $1;
      `,
      [color]
    );

    if (!merch) {
      return null;
    }

    return merch;
  } catch (error) {
    throw error;
  }
}

async function getMerchByPrice(price) {
  try {
    const {
      rows: [merch],
    } = await client.query(
      `
      SELECT *
      FROM activities
      WHERE price = $1;
      `,
      [price]
    );

    if (!merch) {
      return null;
    }

    return merch;
  } catch (error) {
    throw error;
  }
}

async function updateMerch({ id, fields }) {
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
      rows: [updateTheMerch],
    } = await client.query(
      `
        UPDATE merch
        SET ${setString}
        WHERE id = ${id}
        RETURNING *;
    `,
      Object.values(fields)
    );
    return updateTheMerch;
  } catch (error) {}
}

async function deleteMerch(merchId) {
  try {
    const response = await client.query(
      `
            DELETE
            FROM merch 
            WHERE id = $1
            RETURNING *;
        `,
      [merchId]
    );
    return response.rows[0];
  } catch (error) {}
}

module.exports = {
  createMerch,
  getAllMerch,
  getMerchById,
  getMerchByType,
  getMerchBySize,
  getMerchByColor,
  getMerchByPrice,
  updateMerch,
  deleteMerch,
};
