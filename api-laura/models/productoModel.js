const mysql = require('mysql2/promise');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
});

async function getAllProducts() {
  try {
    const [rows] = await pool.execute('SELECT * FROM products');
    return rows;
  } catch (error) {
    console.error('Error getting all products:', error);
    throw error;
  }
}

async function getProductById(id) {
  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error getting product by ID:', error);
    throw error;
  }
}

async function createProduct(name, description, price, stock) {
  try {
    const [result] = await pool.execute(
      'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
      [name, description, price, stock]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

async function updateProduct(id, name, description, price, stock) {
  try {
    const [result] = await pool.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
      [name, description, price, stock, id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};