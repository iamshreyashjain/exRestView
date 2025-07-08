import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function ProducForm() {

    const navigate = useNavigate();
    const [update, setUpdate] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        if (id) {
            const getProducts = async () => {
                const resposne = await axios.get(`http://localhost:8080/products/${id}`)
                setFormData(resposne.data)
            }
            setUpdate(true)
            getProducts()
        }
    }, [id])



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
    })

    const handleSubmit = async (e) => {
        console.log('sub');
        e.preventDefault();
        if (formData?.title?.trim().length === 0) {
            alert("Please Add Titlsse")
            return;
        }
        try {
            const resposne = await axios.post('http://localhost:8080/products', formData)
            if (resposne) {
                console.log('success')
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
                navigate('/')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleUpdateSubmit = async (e) => {
        console.log('upda');
        e.preventDefault();
        if (formData?.title?.trim().length === 0) {
            alert("Please Add Title")
            return;
        }
        try {
            const resposne = await axios.put(`http://localhost:8080/products/${id}`, formData)
            if (resposne) {
                console.log('success')
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
                navigate('/')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <form className="m-3">
                <label > Title</label>
                <br />
                <input type="text" name="title" value={formData.title} className="border rounded p-2  w-6/12" onChange={handleChange} />
                <br />

                <label> Description</label>
                <br />
                <input type="text" name="description" value={formData.description} className="border rounded p-2  w-6/12" onChange={handleChange} />
                <br />

                <label> Price</label>
                <br />
                <input type="text" name="price" value={formData.price} className="border rounded p-2  w-6/12" onChange={handleChange} />
                <br />

                <label> Discount Percentage</label>
                <br />
                <input type="text" name="discountPercentage" value={formData.discountPercentage} className="border rounded p-2  w-6/12" onChange={handleChange} />
                <br />

                <label>Rating</label>
                <br />
                <input type="text" name="rating" value={formData.rating} className="border rounded p-2  w-6/12" onChange={handleChange} />
                <br />

                <label>Category</label>
                <br />
                <input type="text" name="category" value={formData.category} className="border rounded p-2  w-6/12" onChange={handleChange} />
                <br />

                <label>Stock</label>
                <br />
                <input type="text" name="stock" value={formData.stock} className="border rounded p-2  w-6/12" onChange={handleChange} />
                <br />
                {update ? 
                <button onClick={handleUpdateSubmit} className="text-white shadow-md flex items-center justify-center rounded-md outline-none my-10 py-2 px-32 mx-auto bg-blue-500  m-2">Update</button>
                :
                <button onClick={handleSubmit} className="text-white shadow-md flex items-center justify-center rounded-md outline-none my-10 py-2 px-32 mx-auto bg-blue-500  m-2">Add</button>
                }
            </form>
        </>
    )
}