import express from "express";
import {
    getProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController.js";
import { authenticateToken } from "../middleware/authmiddleware.js";
import { authorizeAdmin } from "../middleware/authmiddleware.js";

const router =  express.Router();

router.get('/products', getProducts); // Semua pengguna
router.get('/products/:id', getProductById); // Semua Pengguna
router.post('/products', authenticateToken, authorizeAdmin, saveProduct);
router.patch('/products/:id', authenticateToken, authorizeAdmin, updateProduct);
router.delete('/products/:id', authenticateToken, authorizeAdmin, deleteProduct);

export default router;