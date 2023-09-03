const Product = require('../models/product.js')
const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, select, numericFilters } = req.query
    const queryObject = {}

    if (company) {
        queryObject.company = company
    }
    if (featured) {
        queryObject.featured = featured === 'true' ? 'true' : 'false'
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" }
    }
    if (numericFilters) {
        const operatorsMap = {
            '>': '$gt',
            '<': '$lt',
            '>=': '$gte',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|<=|>=)\b/g
        let newFilters = numericFilters.replace(regEx, (match) => `-${operatorsMap[match]}-`)
        const options = ['price', 'rating']
        newFilters.split(',').forEach((item) => {
            const [field, operator, value] = item.split("-")
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
                console.log(queryObject)
            }
        })
        // console.log(numericFilters)
        // console.log(newFilters)
    }
    let result = Product.find(queryObject)
    // sort
    if (sort) {
        const sortValues = sort.split(",").join(" ")
        result = result.sort(sortValues)
        // console.log(sortValues)
    }
    // select
    if (select) {
        const selectValues = select.split(",").join(" ")
        result = result.select(selectValues)
    }
    // page
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)
    // numeric filters

    // console.log(req.query)
    const products = await result
    return res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProducts }