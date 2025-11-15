import Product from "../models/productModel.js";
import cloudinary from "../lib/cloudinary.js";
import dotenv from "dotenv";

dotenv.config();

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, stock, bestseller } = req.body;
        const files = req.files;
        if (!name || !description || !price || !category || !subCategory || !sizes || !stock || !bestseller) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const imageUrls = [];
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: "products",
            });
            imageUrls.push(result.secure_url);
        }
        const newProduct = new Product({
            name,
            description,
            price,
            image: imageUrls,
            category,
            subCategory,
            sizes:JSON.parse(sizes),
            stock,
            bestseller: bestseller || false,
            dateAdded: new Date(),
            dateUpdated: new Date()
        });
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Server error" });
    }
}
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error" });
    }
}
const deleteProduct = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct){
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });

    }catch(error){
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Server error" });
    }
}
const getProductById = async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }catch(error){
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error" });
    }
}
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const files = req.files;

        const productToUpdate = await Product.findById(id);
        if (!productToUpdate) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedData = {};

        const fieldsToUpdate = ['name', 'description', 'price', 'category', 'subCategory', 'stock', 'bestseller'];
        fieldsToUpdate.forEach(field => {
            if (req.body[field] !== undefined) {
                updatedData[field] = req.body[field];
            }
        });
        
        if (req.body.sizes) {
            updatedData.sizes = JSON.parse(req.body.sizes);
        }

        let imageUrls = productToUpdate.image;
        if (files && files.length > 0) {
            const uploadedUrls = [];
            for (const file of files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "products",
                });
                uploadedUrls.push(result.secure_url);
            }
            imageUrls = imageUrls.concat(uploadedUrls);
        }
        updatedData.image = imageUrls;

        updatedData.dateUpdated = new Date();

        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export { addProduct, getAllProducts, deleteProduct, getProductById, updateProduct };