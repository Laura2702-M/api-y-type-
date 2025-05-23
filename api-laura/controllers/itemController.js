const productModel = require('../models/product.model');

async function getAllProducts(req, res) {
  try {
    const products = await productModel.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting all products:', error);
    res.status(500).json({ message: 'Failed to retrieve products' });
  }
}

async function getProductById(req, res) {
  try {
    const productId = req.params.id;
    const product = await productModel.getProductById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).json({ message: 'Failed to retrieve product' });
  }
}

async function createProduct(req, res) {
  try {
    const { name, description, price, stock } = req.body;
    const productId = await productModel.createProduct(name, description, price, stock);
    res.status(201).json({ message: 'Product created successfully', productId });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product' });
  }
}

async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const { name, description, price, stock } = req.body;
    const updated = await productModel.updateProduct(productId, name, description, price, stock);
    if (updated) {
      res.status(200).json({ message: 'Product updated successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product' });
  }
}

async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    const deleted = await productModel.deleteProduct(productId);
    if (deleted) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};