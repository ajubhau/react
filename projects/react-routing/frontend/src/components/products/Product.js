import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Product = () => {

    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'));

    const params = useParams();

    useEffect(() => {
        if(params.id !== undefined) {
            axios('https://dummyjson.com/products/' + params.id , { 
                method: 'PUT', 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res.data)
                setFormData({
                    title: res.data.title,
                    category: res.data.category,
                    brand: res.data.brand,
                    price: res.data.price 
                })
            });
        }
    }, [params.id, token])

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        brand: '',
        price: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        })
        )
    }

    const submit = (event) => {
        event.preventDefault();
        console.log(formData);
        const url = params.id ? 'https://dummyjson.com/products/'+ params.id : 'https://dummyjson.com/products/add';

        axios(url, { 
            method: params.id ? 'PUT' : 'POST', 
            data: JSON.stringify(formData),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        
        navigate('/dashboard');
    }

    const navigateTo = () => {
        navigate('/dashboard');
    }
    return <>
         <h1>Product form</h1><br />
         <hr />
         <Button onClick={navigateTo} style={{    background: '#fff',
    border: '0px solid',
    color: '#0d6efd'}}>
                    Go to Dashboard
                </Button>

              <Form onSubmit={submit}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" placeholder="Enter title" onChange={handleChange} value={formData.title} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" name="brand" placeholder="Enter brand" onChange={handleChange} value={formData.brand} />
                </Form.Group>

                <Form.Select aria-label="Default select example" name="category" onChange={handleChange}>
                    <option>Open this select menu</option>
                    <option value="beauty">beauty</option>
                    <option value="fragrances">fragrances</option>
                    <option value="furniture">furniture</option>
                </Form.Select>

                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" name="price" placeholder="Enter price" onChange={handleChange} value={formData.price} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
    </>
}
export default Product;