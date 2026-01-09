import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductList from './ProductList';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [products, setProducts] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
        .then(response => {
             setProducts(response.data.products);
        }).catch(error => {
            console.log(error.message);
        });
    }, []);

    
const deleteItem = (id) => {
        axios.delete('https://dummyjson.com/products/' + id)
        .then(response => {
            axios.get('https://dummyjson.com/products')
            .then(response => {
                setProducts(response.data.products);        
            }).catch(error => {
                console.log(error.message);
            });
        })
    }

    const addProduct = () => {
        navigate('/add-product')
    }
    return <>
        <h1> Welcome to dashboard</h1>
        <button onClick={addProduct}>Add product</button><br/>
        <hr></hr>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products && products.map((item) => 
                   <ProductList key={item.id} item={item} deleteItem={() => deleteItem(item.id)} />
                )}
            </tbody>
        </Table>
    </>
}

export default Dashboard;