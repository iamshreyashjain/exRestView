import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProdcuts] = useState([])
    
    const getProducts = async () => {
        try {
            const resposne = await axios.get("https://exrest.onrender.com/products")
            console.log(resposne)
            const { data } = resposne;
            setProdcuts(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getProducts();
    }, [])


    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://exrest.onrender.com/products/${id}`);
            if (response) {
                console.log("Deleted Successfully");

                const newResponse = await axios.get("https://exrest.onrender.com/products");
                setProdcuts(newResponse.data);
            }
        } catch (err) {
            console.log(err);
        }
    };


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        discountPercentage: '',
        rating: '',
        category: '',
        thumbnail: '',
        stock: '',
        images: ''
    });

    const resetFormData = () => {
        setFormData({
            title: '',
            description: '',
            price: '',
            discountPercentage: '',
            rating: '',
            category: '',
            thumbnail: '',
            stock: '',
            images: ''
        });
    };

    const getProductById = async (id) => {
        const res = await axios.get(`https://exrest.onrender.com/products/${id}`);
        setFormData(res.data);
    };

    const addProduct = async () => {
         await axios.post(`https://exrest.onrender.com/products`, formData);
         await getProducts();
    };

    const updateProduct = async (id) => {
        return await axios.put(`https://exrest.onrender.com/products/${id}`, formData);
    };

    return (
        <ProductContext.Provider value={{ handleDelete, products, formData, setFormData, getProductById, addProduct, updateProduct, resetFormData }}>
            {children}
        </ProductContext.Provider>
    )
}