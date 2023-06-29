const client = require("./client")

async function addToCart(item, userId) {
    try {
        const response = await client.query(`
            INSERT INTO cart
        `)
    } catch (error) {
        
    }
}