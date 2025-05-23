const express = require('express');
const productController = require('../controllers/product.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const router = express.Router();

// Rutas públicas para obtener todos los productos y un producto por ID
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);

// Rutas protegidas para administradores (requieren autenticación)
router.post('/products', authenticateToken, productController.createProduct);
router.put('/products/:id', authenticateToken, productController.updateProduct);
router.delete('/products/:id', authenticateToken, productController.deleteProduct);

module.exports = router;