import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { MdDelete } from "react-icons/md";
import { ProductContext } from "../context/ProductProvider";



export default function Products() {
    const navigate = useNavigate()

    const { handleDelete, products} = useContext(ProductContext);    
    
    const handleClick = (item) => {
        navigate(`/form/${item.id}`)
    }
    const handleDeleteItem = (item) =>{
        handleDelete(item.id)
    }

    return (
        <>
            <button className="float float-right border-2 m-2 px-4  py-1 rounded-md shadow  shadow-md text-sm" onClick={() => navigate('/form')}>ADD FORM</button>
            {products.map((item) => (
                <div className="p-2 w-3/12 ">
                    <div key={item?.id}>
                        <img src={item?.thumbnail} className="w-9/12 h-48" />
                        <div className="flex justify-around items-center">
                            <span className="text-green-600 font-semibold">{item?.title}</span>
                            <MdDelete onClick={() => handleDeleteItem(item)} className="text-red-600" size={22}> Click </MdDelete>
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