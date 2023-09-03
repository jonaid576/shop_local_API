const { connect } = require('./db/connect')
const allProducts = require('./products.json')
const Product = require('./models/product.js')
const populate = async () => {
    try {
        await connect()
        await Product.deleteMany()
        await Product.create(allProducts)
        console.log('success')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

populate()