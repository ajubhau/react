import { useNavigate } from 'react-router-dom';

const ProductList = ({item, deleteItem}) => {
    const navigate = useNavigate();

    const editItem = (id) => {
        navigate('/product/' + id)
    }

    return <>
         <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.category}</td>
            <td>{item.brand}</td>
            <td>{item.price}</td>
            <td><button onClick={() => editItem(item.id)}>Edit</button> <button onClick={deleteItem}>Delete</button></td>
        </tr>
    </>
}

export default ProductList;