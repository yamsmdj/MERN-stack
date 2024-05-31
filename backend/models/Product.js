
const ProductSchema = {
    "name": string,
    "description": string,
    "price": number,
    "inStock": boolean
}

module.exports = model('Product', ProductSchema);