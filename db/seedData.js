const client = require("./client");
const { createTreat } = require("./treats");
const { createUser } = require("./users");
const { createMerch } = require("./merch");
const { faker } = require("@faker-js/faker");

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
                type VARCHAR(255) UNIQUE NOT NULL,
                stock SMALLINT,
                price MONEY NOT NULL
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
                user_id INTEGER REFERENCES users(id),
                treat_id INTEGER REFERENCES treats(id),
                merch_id INTEGER REFERENCES merch(id)
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
      {
        username: "admin",
        password: "password123",
        firstName: "adddy",
        lastName: "miinnn",
        email: "fake@admingg.com",
        roleId: 1,
      },
    ];
    for (let i = 0; i < 99; i++) {
      usersToCreate.push({
        username: faker.internet.userName(),
        password: faker.internet.password({ length: 20 }),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
      });
    }
    const users = await Promise.all(usersToCreate.map(createUser));
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
        type: "chocolate chip cookie",
        price: 1,
        stock: faker.number.int({ max: 100 }),
      },
      {
        type: "fudge brownie",
        price: 2.5,
        stock: faker.number.int({ max: 100 }),
      },
      {
        type: "chocolate pretzel",
        price: 1.5,
        stock: faker.number.int({ max: 100 }),
      },
      {
        type: faker.commerce.productName(),
        price: faker.commerce.price({ max: 10 }),
        stock: faker.number.int({ max: 100 }),
      },
    ];
    for (let i = 0; i < 99; i++) {
      treatsToPush.push({
        type: faker.commerce.productName(),
        price: faker.commerce.price({ max: 10 }),
        stock: faker.number.int({ max: 100 }),
      });
    }
    const treats = await Promise.all(treatsToPush.map(createTreat));
    console.log("Treats created:");
    console.log(treats);
    console.log("Finished creating treats!");
  } catch (error) {
    console.error("Error creating treats!");
  }
}

async function createInitialMerch() {
  console.log("Starting to create merch...");
  try {
    const merchToCreate = [
      {
        id: 1,
        type: "shirt",
        size: "medium",
        color: "light gray",
        price: 20,
      },
      {
        id: 2,
        type: "shirt",
        size: "large",
        color: "light gray",
        price: 20,
      },
      {
        id: 3,
        type: "shirt",
        size: "xl",
        color: "light gray",
        price: 20,
      },
      {
        id: 4,
        type: "shirt",
        size: "2xl",
        color: "light gray",
        price: 20,
      },
      {
        id: 5,
        type: "shirt",
        size: "medium",
        color: "navy blue",
        price: 20,
      },
      {
        id: 6,
        type: "shirt",
        size: "large",
        color: "navy blue",
        price: 20,
      },
      {
        id: 7,
        type: "shirt",
        size: "xl",
        color: "navy blue",
        price: 20,
      },
      {
        id: 8,
        type: "shirt",
        size: "2xl",
        color: "navy blue",
        price: 20,
      },
      {
        id: 9,
        type: "shirt",
        size: "medium",
        color: "red",
        price: 20,
      },
      {
        id: 10,
        type: "shirt",
        size: "large",
        color: "red",
        price: 20,
      },
      {
        id: 11,
        type: "shirt",
        size: "xl",
        color: "red",
        price: 20,
      },
      {
        id: 12,
        type: "shirt",
        size: "2xl",
        color: "red",
        price: 20,
      },
      {
        id: 13,
        type: "shirt",
        size: "medium",
        color: "black",
        price: 20,
      },
      {
        id: 14,
        type: "shirt",
        size: "large",
        color: "black",
        price: 20,
      },
      {
        id: 15,
        type: "shirt",
        size: "xl",
        color: "black",
        price: 20,
      },
      {
        id: 16,
        type: "shirt",
        size: "2xl",
        color: "black",
        price: 20,
      },
      {
        id: 17,
        type: "baseball cap",
        size: "large",
        color: "english oak",
        price: 25,
      },
      {
        id: 18,
        type: "baseball cap",
        size: "xl",
        color: "english oak",
        price: 25,
      },
      {
        id: 19,
        type: "baseball cap",
        size: "large",
        color: "goldenrod",
        price: 25,
      },
      {
        id: 20,
        type: "baseball cap",
        size: "xl",
        color: "goldenrod",
        price: 25,
      },
      {
        id: 21,
        type: "bucket hat",
        size: "large",
        color: "english oak",
        price: 25,
      },
      {
        id: 22,
        type: "bucket hat",
        size: "xl",
        color: "english oak",
        price: 25,
      },
      {
        id: 23,
        type: "bucket hat",
        size: "large",
        color: "goldenrod",
        price: 25,
      },
      {
        id: 24,
        type: "bucket hat",
        size: "xl",
        color: "goldenrod",
        price: 25,
      },
      {
        id: 25,
        type: "beanie",
        size: "large",
        color: "english oak",
        price: 25,
      },
      {
        id: 26,
        type: "beanie",
        size: "xl",
        color: "english oak",
        price: 25,
      },
      {
        id: 27,
        type: "beanie",
        size: "large",
        color: "goldenrod",
        price: 25,
      },
      {
        id: 28,
        type: "beanie",
        size: "xl",
        color: "goldenrod",
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
  } catch (error) {}
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
