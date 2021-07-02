const Product = require('../models/Product')

module.exports.product_post = async (req, res) => {

    try {
        const product = new Product(req.body);
       
 
        // await product.save()
        // await Category.updateMany({ '_id': product.categories }, { $push: { products: newProduct._id } });
        

        return res.send(product);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}