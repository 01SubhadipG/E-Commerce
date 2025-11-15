import express from 'express';
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js';
import upload from '../middleware/mutler.js';
import adminAuth from '../middleware/adminauth.js';


const productRouter = express.Router();

productRouter.post('/add',adminAuth, upload.array('images', 10), addProduct);
productRouter.get('/all', getAllProducts);
productRouter.get('/product/:id', getProductById);
productRouter.put('/update/:id',adminAuth, upload.array('images', 10), updateProduct);
productRouter.delete('/delete/:id',adminAuth, deleteProduct);

export default productRouter;