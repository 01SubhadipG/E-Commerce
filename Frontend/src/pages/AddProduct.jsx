import React, { useState } from 'react';

const AddProduct = () => {
    // State to hold form data
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        subcategory: '', // Subcategory is part of the state
        sizes: [],
        stock: '',
        bestSeller: false,
    });
    
    // State for image files (can hold multiple files)
    const [images, setImages] = useState([]);

    // Pre-defined options for categories and subcategories
    const categories = ['Men', 'Women', 'Kids', 'Electronics'];
    const subcategories = {
        Men: ['T-Shirts', 'Jeans', 'Shoes'],
        Women: ['Dresses', 'Tops', 'Skirts'],
        Kids: ['Toys', 'Clothing', 'Books'],
        Electronics: ['Mobiles', 'Laptops', 'Cameras'],
    };
    const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];

    // Handler for regular input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    // Handler for size checkbox changes
    const handleSizeChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setProduct(prevProduct => ({ ...prevProduct, sizes: [...prevProduct.sizes, value] }));
        } else {
            setProduct(prevProduct => ({ ...prevProduct, sizes: prevProduct.sizes.filter(size => size !== value) }));
        }
    };
    
    // Handler for image file changes
    const handleImageChange = (e) => {
        // e.target.files is a list of all selected files
        setImages([...e.target.files]);
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Append all text-based product data
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('category', product.category);
        formData.append('subcategory', product.subcategory); // Subcategory is included here
        formData.append('stock', product.stock);
        formData.append('bestSeller', product.bestSeller);
        product.sizes.forEach(size => formData.append('sizes[]', size));

        // *** KEY PART FOR MULTIPLE IMAGES ***
        // Loop through the images array and append each file to FormData
        images.forEach(image => {
            formData.append('images', image);
        });

        // Log the FormData entries to the console for testing
        console.log('Form Submitted with the following data:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        
        // Here you would send the formData to your backend API
    };

    return (
        <div className='max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10'>
            <h1 className='text-3xl font-bold text-center mb-6'>Add New Product</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Product Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input type="text" name="name" id="name" value={product.name} onChange={handleChange} placeholder='e.g., "Classic Cotton T-Shirt"' className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2' required />
                </div>
                
                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" id="description" value={product.description} onChange={handleChange} rows="4" placeholder='Detailed product description...' className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2' required></textarea>
                </div>
                
                {/* Price */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                    <input type="number" name="price" id="price" value={product.price} onChange={handleChange} placeholder='e.g., 29.99' className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2' required />
                </div>

                {/* === Multiple Images Input === */}
                <div>
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">Product Images</label>
                    <input 
                        type="file" 
                        name="images" 
                        id="images" 
                        onChange={handleImageChange} 
                        className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100' 
                        multiple // This attribute allows you to select multiple files
                        required 
                    />
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select name="category" id="category" value={product.category} onChange={handleChange} className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2' required>
                        <option value="" disabled>Select a category</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>

                {/* === Subcategory Field (Appears after selecting a category) === */}
                {product.category && (
                    <div>
                        <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">Subcategory</label>
                        <select name="subcategory" id="subcategory" value={product.subcategory} onChange={handleChange} className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2' required>
                            <option value="" disabled>Select a subcategory</option>
                            {subcategories[product.category]?.map(subcat => <option key={subcat} value={subcat}>{subcat}</option>)}
                        </select>
                    </div>
                )}
                
                {/* Sizes, Stock, Best Seller... (rest of the form is the same) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Available Sizes</label>
                    <div className='mt-2 flex flex-wrap gap-4'>
                        {availableSizes.map(size => (
                            <div key={size} className="flex items-center">
                                <input id={`size-${size}`} name="sizes" type="checkbox" value={size} checked={product.sizes.includes(size)} onChange={handleSizeChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                <label htmlFor={`size-${size}`} className="ml-2 block text-sm text-gray-900">{size}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                    <input type="number" name="stock" id="stock" value={product.stock} onChange={handleChange} placeholder='e.g., 100' className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2' required />
                </div>
                <div className="flex items-center">
                    <input id="bestSeller" name="bestSeller" type="checkbox" checked={product.bestSeller} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    <label htmlFor="bestSeller" className="ml-2 block text-sm font-medium text-gray-900">Mark as Best Seller</label>
                </div>

                <button type='submit' className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'>
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;