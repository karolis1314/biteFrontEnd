import React, { useState, useEffect } from "react";
import { withRouter } from '../router/withRouter';
import "./Customer.css";

export const customerID = {value:0};

const API_BASE_URL = "http://localhost:8080/api/v1/customer";

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [editingCustomerId, setEditingCustomerId] = useState(null);
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        companiesName: "",
        companiesCode: "",
        personalCode: "",
        successMessage: null,
        selectedCustomerId: null
    });

    const handleEdit = (id, customer) => {
        setEditingCustomerId(id);
        setState({
            ...customer,
            successMessage: null
        });
    };
    const handleSelect = (id) => {
        setState(prevState => ({
            ...prevState,
            selectedCustomerId: id,
        }));
        setId(id);
    };

    const setId = (id) => {
        customerID.value = id;
        alert("You have selected customer with id: " + customerID.value);
    }


    const handleUpdateFormSubmit = (e) => {
        e.preventDefault();
        handleUpdateCustomer(editingCustomerId, state);
        setEditingCustomerId(null);
    };

    const handleFormChange = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await fetch(API_BASE_URL, {
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

    const handleUpdateCustomer = async (id, updatedCustomer) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCustomer),
            });
            if (response.ok || response.status === 200) {
                const updatedCustomers = customers.map((customer) => {
                    if (customer.id === id) {
                        return { ...customer, ...updatedCustomer };
                    }
                    return customer;
                });
                setCustomers(updatedCustomers);
                setState(prevState => ({
                    ...prevState,
                    successMessage: 'Customer updated successfully'
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

    const handleDeleteCustomer = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok || response.status === 200) {
                setCustomers(customers.filter((customer) => customer.id !== id));
                setState(prevState => ({
                    ...prevState,
                    successMessage:'Customer deleted successfully'
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
    return (
        <div className="customer-container">
            {state.successMessage && <div className="success-message">{state.successMessage}</div>}
            <h1>Customers</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Company Name</th>
                    <th>Company Code</th>
                    <th>Personal Code</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.firstName}</td>
                        <td>{customer.lastName}</td>
                        <td>{customer.email}</td>
                        <td>{customer.companiesName}</td>
                        <td>{customer.companiesCode}</td>
                        <td>{customer.personalCode}</td>
                        <td>
                            {editingCustomerId !== customer.id ? (
                                <>
                                    <button className="button" onClick={() => handleEdit(customer.id, customer)}>Edit</button>
                                    <button className="button" onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                                    <button className="button" onClick={() => handleSelect(customer.id)}>Select</button>
                                </>
                            ) : (
                                <>
                                    <button className="button" onClick={handleUpdateFormSubmit}>Update</button>
                                    <button className="button" onClick={() => setEditingCustomerId(null)}>Cancel</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
            {editingCustomerId && (
                <div className="edit-form">
                    <h2>Edit Customer</h2>
                    <form onSubmit={handleUpdateFormSubmit}>
                        <div className="form-input">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={state.firstName}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={state.lastName}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={state.email}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="companiesName">Company Name:</label>
                            <input
                                type="text"
                                id="companiesName"
                                name="companiesName"
                                value={state.companiesName}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="companiesCode">Company Code:</label>
                            <input
                                type="text"
                                id="companiesCode"
                                name="companiesCode"
                                value={state.companiesCode}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="personalCode">Personal Code:</label>
                            <input
                                type="text"
                                id="personalCode"
                                name="personalCode"
                                value={state.personalCode}
                                onChange={handleFormChange}
                            />
                        </div>
                        <button className="button" type="submit">Update</button>
                    </form>

                </div>
            )}
        </div>
    );
};


export default withRouter(Customer);