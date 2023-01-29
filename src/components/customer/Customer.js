import React, { useState, useEffect } from "react";
import { withRouter } from '../router/withRouter';
import "./Customer.css";

const API_BASE_URL = "http://localhost:8080/api/v1";

const Customer = (props) => {
    const [customers, setCustomers] = useState([]);
    const [ setError] = useState(null);

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        companiesName: "",
        companiesCode: "",
        personalCode: "",
        successMessage: null,
        errorMessage: null
    });

    useEffect(() => {
        fetchCustomers().then(r => console.log(r));
    }, []);

    const fetchCustomers = async () => {
    try {
        const response = await fetch(API_BASE_URL + "/customer", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            setCustomers(data);
            setState(prevState => ({
                ...prevState,
                successMessage: 'Customers fetched successfully'
            }));
        } else {
            const data = await response.json();
            setState(prevState => ({
                ...prevState,
                successMessage: data.message
            }));
        }
    } catch (error) {
        console.log("Error:", error);
    }
};

    // const fetchCustomers = async () => {
    //     try {
    //         const res = await fetch(API_BASE_URL);
    //         const data = await res.json();
    //         setCustomers(data);
    //     } catch (err) {
    //         setError(err);
    //     }
    // };

    const handleUpdateCustomer = async (id, updatedCustomer) => {
        try {
            const res = await fetch(`${API_BASE_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCustomer),
            });
            const data = await res.json();
            setCustomers(
                customers.map((customer) => (customer.id === id ? data : customer))
            );
            props.history.push('/');
        } catch (err) {
            setError(err);
        }
    };

    const handleDeleteCustomer = async (id) => {
        try {
            await fetch(`${API_BASE_URL}/${id}`, {
                method: "DELETE",
            });
            setCustomers(customers.filter((customer) => customer.id !== id));
            props.history.push('/');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="customer-container">
            <h1>Customers</h1>
            <h2>{state.successMessage}</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Companies Name</th>
                    <th>Companies Code</th>
                    <th>Personal Code</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.email}</td>
                        <td>{customer.firstName}</td>
                        <td>{customer.lastName}</td>
                        <td>{customer.companiesName}</td>
                        <td>{customer.companiesCode}</td>
                        <td>{customer.personalCode}</td>
                        <td>
                            <button onClick={() => handleUpdateCustomer(customer.id)}>Edit</button>
                            <button onClick={() => handleDeleteCustomer(
                                customer.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default withRouter(Customer);

