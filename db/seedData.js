const client = require("./client");
const { createTreat } = require("./treats");
const { createUser, updateAdminSeed, createAdmin } = require("./users");
const { createMerch } = require("./merch");
const { faker } = require("@faker-js/faker");
const { addToCart } = require("./cart");

const randomName = faker.person.fullName();
const randomEmail = faker.internet.email();

async function dropTables() {
  console.log("Dropping tables");
  await client.query(`
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS merch;
    DROP TABLE IF EXISTS treats;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS roles;
  `);
}

async function createTables() {
  try {
    await client.query(`
            CREATE TABLE roles(
              id SERIAL PRIMARY KEY,
              title VARCHAR(100) NOT NULL
            );
            CREATE TABLE users(
                id SERIAL PRIMARY KEY, 
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                address VARCHAR(255),
                role_id INTEGER REFERENCES roles(id) NOT NULL DEFAULT 2
            );
            CREATE TABLE treats(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                description VARCHAR(255),
                category VARCHAR(255) NOT NULL,
                stock SMALLINT,
                price MONEY NOT NULL,
                photo TEXT
            );
            CREATE TABLE merch(
                id SERIAL PRIMARY KEY,
                type VARCHAR(255) NOT NULL,
                size VARCHAR(50) NOT NULL,
                color VARCHAR(50),
                price MONEY NOT NULL
            );
            CREATE TABLE cart(
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) NOT NULL,
                product_type VARCHAR(255) NOT NULL,
                product_id INTEGER NOT NULL,
                quantity INTEGER,
                status VARCHAR(255) NOT NULL DEFAULT 'active'
            );
            
        `);
    console.log("Successfully created tables");
  } catch (error) {}
}

async function createRoles() {
  try {
    await client.query(`
      INSERT INTO roles VALUES (1, 'admin');
      INSERT INTO roles VALUES (2, 'customer');
    `);
  } catch (error) {}
}

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      {
        username: "albert",
        password: "bertie99",
        firstName: "albert",
        lastName: "bert",
        email: "fake@albert.com",
      },
      {
        username: "sandra",
        password: "sandra123",
        firstName: "sandra",
        lastName: "daisy",
        email: "fake@sandra.com",
      },
      {
        username: "glamgal",
        password: "glamgal123",
        firstName: "glamorous",
        lastName: "gal",
        email: "fake@glam.com",
      },
    ];
    const adminsToCreate = [
      {
        username: "admin",
        password: "password123",
        firstName: "adddy",
        lastName: "miinnn",
        email: "fake@admingg.com",
        role_id: 1,
      },
      {
        username: "isafernandez",
        password: "isafernandez",
        firstName: "Isaac",
        lastName: "Fernandez",
        email: "fake@isaac.com",
        role_id: 1,
      },
      {
        username: "jeremy-s",
        password: "password1",
        firstName: "Jeremy",
        lastName: "Stanley",
        email: "fake@jeremy.com",
        role_id: 1,
      },
    ];
    for (let i = 7; i < 99; i++) {
      usersToCreate.push({
        username: faker.internet.userName(),
        password: faker.internet.password({ length: 20 }),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
      });
    }
    const users = await Promise.all(usersToCreate.map(createUser));
    const admins = await Promise.all(adminsToCreate.map(createAdmin));
    updateAdminSeed();
    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialTreats() {
  console.log("Starting to create treats");
  try {
    const treatsToPush = [
      {
        name: "chocolate chip cookie",
        description: faker.commerce.productDescription(),
        category: "cookie",
        price: 1,
        stock: faker.number.int({ min: 1, max: 100 }),
        photo: faker.image.urlLoremFlickr({ category: "food" }),
      },
      {
        name: "fudge brownie",
        description: faker.commerce.productDescription(),
        category: "brownie",
        price: 2.5,
        stock: faker.number.int({ min: 1, max: 100 }),
        photo: faker.image.urlLoremFlickr({ category: "cookies" }),
      },
      {
        name: "snickerdoodle",
        description: faker.commerce.productDescription(),
        category: "cookie",
        price: 1.5,
        stock: faker.number.int({ min: 1, max: 100 }),
        photo: faker.image.urlLoremFlickr({ category: "cookies" }),
      },
    ];
    console.log(treatsToPush);
    for (let i = 0; i < 99; i++) {
      treatsToPush.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: faker.helpers.arrayElement(["cookie", "brownie"]),
        price: faker.commerce.price({ min: 1, max: 10 }),
        stock: faker.number.int({ min: 1, max: 100 }),
        photo: faker.image.urlLoremFlickr({ category: "cookie" }),
      });
    }
    const treats = await Promise.all(treatsToPush.map(createTreat));
    console.log("Treats created:");
    console.log(treats);
    console.log("Finished creating treats!");
  } catch (error) {
    console.error("Error creating treats!");
    throw error;
  }
}

async function createInitialCarts() {
  console.log("Beginning cart creation");
  try {
    const cartsToPush = [
      {
        userId: 777,
        productType: "treat",
        productId: 2,
        quantity: 4,
      },
      {
        userId: 777,
        productType: "merch",
        productId: 2,
        quantity: 9,
      },
      {
        userId: 777,
        productType: "merch",
        productId: 7,
        quantity: 43,
      },
      {
        userId: 777,
        productType: "treat",
        productId: 58,
        quantity: 49,
      },
      {
        userId: 777,
        productType: "treat",
        productId: 73,
        quantity: 3,
      },
    ];
    for (let i = 0; i < 10; i++) {
      let productTypeFake = faker.number.int({ max: 2 });
      if (productTypeFake === 1) {
        cartsToPush.push({
          userId: 777,
          productType: "treat",
          productId: faker.number.int({ min: 1, max: 100 }),
          quantity: faker.number.int({ min: 1, max: 20 }),
        });
      } else {
        cartsToPush.push({
          userId: 777,
          productType: "merch",
          productId: faker.number.int({ min: 1, max: 26 }),
          quantity: faker.number.int({ min: 1, max: 20 }),
        });
      }
    }
    for (let i = 0; i < 99; i++) {
      let productTypeFake = faker.number.int({ max: 2 });
      if (productTypeFake === 1) {
        cartsToPush.push({
          userId: faker.number.int({ min: 1, max: 10 }),
          productType: "treat",
          productId: faker.number.int({ min: 1, max: 100 }),
          quantity: faker.number.int({ min: 1, max: 20 }),
        });
      } else {
        cartsToPush.push({
          userId: faker.number.int({ min: 1, max: 10 }),
          productType: "merch",
          productId: faker.number.int({ min: 1, max: 26 }),
          quantity: faker.number.int({ min: 1, max: 20 }),
        });
      }
    }
    console.log("almost there carts");
    const carts = await Promise.all(cartsToPush.map(addToCart));
    console.log("Carts created:");
    console.log("Finished creating carts!");
  } catch (error) {}
}

async function createInitialMerch() {
  console.log("Starting to create merch...");
  try {
    const merchToCreate = [
      {
        id: 1,
        type: "Shirt",
        size: "Medium",
        color: "Light Gray",
        price: 20,
      },
      {
        id: 2,
        type: "Shirt",
        size: "Large",
        color: "Light Gray",
        price: 20,
      },
      {
        id: 3,
        type: "Shirt",
        size: "XL",
        color: "Light Gray",
        price: 20,
      },
      {
        id: 4,
        type: "Shirt",
        size: "2xl",
        color: "Light Gray",
        price: 20,
      },
      {
        id: 5,
        type: "Shirt",
        size: "Medium",
        color: "Navy Blue",
        price: 20,
      },
      {
        id: 6,
        type: "Shirt",
        size: "Large",
        color: "Navy Blue",
        price: 20,
      },
      {
        id: 7,
        type: "Shirt",
        size: "XL",
        color: "Navy Blue",
        price: 20,
      },
      {
        id: 8,
        type: "Shirt",
        size: "2xl",
        color: "Navy Blue",
        price: 20,
      },
      {
        id: 9,
        type: "Shirt",
        size: "Medium",
        color: "Red",
        price: 20,
      },
      {
        id: 10,
        type: "Shirt",
        size: "Large",
        color: "Red",
        price: 20,
      },
      {
        id: 11,
        type: "Shirt",
        size: "XL",
        color: "Red",
        price: 20,
      },
      {
        id: 12,
        type: "Shirt",
        size: "2xl",
        color: "Red",
        price: 20,
      },
      {
        id: 13,
        type: "Shirt",
        size: "Medium",
        color: "Black",
        price: 20,
      },
      {
        id: 14,
        type: "Shirt",
        size: "Large",
        color: "Black",
        price: 20,
      },
      {
        id: 15,
        type: "Shirt",
        size: "XL",
        color: "Black",
        price: 20,
      },
      {
        id: 16,
        type: "Shirt",
        size: "2xl",
        color: "Black",
        price: 20,
      },
      {
        id: 17,
        type: "Baseball Cap",
        size: "Large",
        color: "English Oak",
        price: 25,
      },
      {
        id: 18,
        type: "Baseball Cap",
        size: "XL",
        color: "English Oak",
        price: 25,
      },
      {
        id: 19,
        type: "Baseball Cap",
        size: "Large",
        color: "Goldenrod",
        price: 25,
      },
      {
        id: 20,
        type: "Baseball Cap",
        size: "XL",
        color: "Goldenrod",
        price: 25,
      },
      {
        id: 21,
        type: "Bucket Hat",
        size: "Large",
        color: "English Oak",
        price: 25,
      },
      {
        id: 22,
        type: "Bucket Hat",
        size: "XL",
        color: "English Oak",
        price: 25,
      },
      {
        id: 23,
        type: "Bucket Hat",
        size: "Large",
        color: "Goldenrod",
        price: 25,
      },
      {
        id: 24,
        type: "Bucket Hat",
        size: "XL",
        color: "Goldenrod",
        price: 25,
      },
      {
        id: 25,
        type: "Beanie",
        size: "Large",
        color: "English Oak",
        price: 25,
      },
      {
        id: 26,
        type: "Beanie",
        size: "XL",
        color: "English Oak",
        price: 25,
      },
      {
        id: 27,
        type: "Beanie",
        size: "Large",
        color: "Goldenrod",
        price: 25,
      },
      {
        id: 28,
        type: "Beanie",
        size: "XL",
        color: "Goldenrod",
        price: 25,
      },
    ];

    const merch = await Promise.all(merchToCreate.map(createMerch));
    console.log("Merch created:");
    console.log(merch);
    console.log("Finished creating merch!");
  } catch (error) {
    console.error("Error creating merch!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createRoles();
    await createInitialUsers();
    await createInitialTreats();
    await createInitialMerch();
    await createInitialCarts();
  } catch (error) {}
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
