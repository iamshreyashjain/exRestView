import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext, ProductProvider } from "../context/ProductProvider";

export default function ProducForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [update, setUpdate] = useState(false);

    const { formData, setFormData, getProductById, addProduct, updateProduct, resetFormData } = useContext(ProductContext);

  useEffect(() => {
    if (id) {
      setUpdate(true);
      getProductById(id);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title.trim().length === 0) {
      alert("Please Add Title");
      return;
    }
    try {
      await addProduct();
      resetFormData();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (formData.title.trim().length === 0) {
      alert("Please Add Title");
      return;
    }
    try {
      await updateProduct(id);
      resetFormData();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
    


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