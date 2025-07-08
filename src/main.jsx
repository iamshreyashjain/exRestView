import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProducForm from './ProductForm.jsx'


const router = createBrowserRouter([
    {path: '/', element: <App/> },
    {path: '/form', element: <ProducForm/> },
    {path: '/form/:id', element: <ProducForm/> }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
