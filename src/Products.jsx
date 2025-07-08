import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { MdDelete } from "react-icons/md";


export default function Products() {
    const navigate = useNavigate()
    const [products, setProdcuts] = useState([])
    
    const handleClick = (item) => {
        navigate(`/form/${item.id}`)
    }

    const handleDelete = async (item) => {
        console.log(item.id)
        try {
            const response = await axios.delete(`http://localhost:8080/products/${item.id}`);
            if (response) {
                console.log("Deleted Successfully");

                const newResponse = await axios.get("http://localhost:8080/products");
                setProdcuts(newResponse.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const resposne = await axios.get("http://localhost:8080/products")
                console.log(resposne)
                const { data } = resposne;
                setProdcuts(data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getProducts();
    }, [])

    return (
        <>
            <button className="float float-right border-2 m-2 px-4  py-1 rounded-md shadow  shadow-md text-sm" onClick={() => navigate('/form')}>ADD FORM</button>
            {products.map((item) => (
                <div className="p-2 w-3/12 ">
                    <div key={item?.id}>
                        <img src={item?.thumbnail} className="w-9/12 h-48" />
                        <div className="flex justify-around items-center">
                            <span className="text-green-600 font-semibold">{item?.title}</span>
                            <MdDelete onClick={() => handleDelete(item)} className="text-red-600" size={22}> Click </MdDelete>
                            <button onClick={() => handleClick(item)} className="border border-blue-400  px-4 rounded-md "> Click </button>
                        </div>

                        <div className="flex justify-around">
                            <p>Price: {item?.price}</p>
                            <p>Avaliablity: {item.stock}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}