import React, { useState, useEffect } from "react";
import { withRouter } from '../router/withRouter';
import "./Account.css";
import { customerID } from '../customer/Customer';

export const accountID = {value:0};

const API_BASE_URL = "http://localhost:8080/api/v1/account";

const Account = () => {
    const [account, setAccount] = useState([]);
    const [editingAccountId, setEditingAccountId] = useState(null);
    const [state, setState] = useState({
        id: "",
        name: "",
        address: "",
        customerId: "",
        successMessage: null,
        postSuccessMessage: null,
        selectedCustomerId: null
    });

    const handleEdit = (id, account) => {
        setEditingAccountId(id);
        setState({
            ...account,
            successMessage: null,
            postSuccessMessage: null
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
        accountID.value = id;
        alert("You have selected account with id: " + accountID.value);
    }


    const handleUpdateFormSubmit = (e) => {
        e.preventDefault();
        handleAccountUpdate(editingAccountId, state);
        setEditingAccountId(null);
    };

    const handleFormChange = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAccount(data);
                setState(prevState => ({
                    ...prevState,
                    successMessage: 'Account Fetch Successful.'
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

    const handleCreateAccount = async (e) => {
        e.preventDefault();

        const payload = {
            name: state.name,
            address: state.address,
            customerId: customerID.value
        };

        try {
            if(customerID.value===null || customerID.value===undefined || customerID.value==="" || customerID.value==="0" || customerID.value===0) {
                setState(prevState => ({
                    ...prevState,
                    postSuccessMessage: 'Please select a customer.'
                }));
                return;
            } else {
                const response = await fetch(API_BASE_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });
                if (response.ok || response.status === 200) {
                    setState(prevState => ({
                        ...prevState,
                        postSuccessMessage: 'Account created successfully.'
                    }));
                } else {
                    const data = await response.json();
                    setState(prevState => ({
                        ...prevState,
                        postSuccessMessage: data.message
                    }));
                }
            }
        } catch (error) {
            console.log("Error:", error);
        }
        window.location.reload();
    };

    const handleAccountUpdate = async (id, updatedAccount) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedAccount),
            });
            if (response.ok || response.status === 200) {
                const updatedAccount = account.map((account) => {
                    if (account.id === id) {
                        return { ...account, ...updatedAccount };
                    }
                    return account;
                });
                setAccount(updatedAccount);
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
        window.location.reload();
    };

    const handleDeleteAccount = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok || response.status === 200) {
                setAccount(account.filter((account) => account.id !== id));
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
            <h1>Accounts</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Customer</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {account.map((account) => (
                    <tr key={account.id}>
                        <td>{account.id}</td>
                        <td>{account.name}</td>
                        <td>{account.address}</td>
                        <td>{account.customerId}</td>
                        <td>
                            {editingAccountId !== account.id ? (
                                <>
                                    <button className="button" onClick={() => handleEdit(account.id, account)}>Edit</button>
                                    <button className="button" onClick={() => handleDeleteAccount(account.id)}>Delete</button>
                                    <button className="button" onClick={() => handleSelect(account.id)}>Select</button>
                                </>
                            ) : (
                                <>
                                    <button className="button" onClick={handleUpdateFormSubmit}>Update</button>
                                    <button className="button" onClick={() => setEditingAccountId(null)}>Cancel</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
            {editingAccountId && (
                <div className="edit-form">
                    <h2>Edit Account</h2>
                    <form onSubmit={handleUpdateFormSubmit}>
                        <div className="form-input">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={state.name}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={state.address}
                                onChange={handleFormChange}
                            />
                        </div>
                    </form>
                </div>
            )}
            <div className="loginForm">
                {state.postSuccessMessage && <div className="success-message">{state.postSuccessMessage}</div>}
                <form className="form">
                    <div className="loginFormComp">
                        <label htmlFor="name">Account Name</label>
                        <input type="name"
                               className="form-control"
                               id="name"
                               placeholder="Enter Account Name"
                               value={state.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="loginFormComp">
                        <label htmlFor="address">Address</label>
                        <input type="address"
                               className="form-control"
                               id="address"
                               placeholder="Enter Address"
                               value={state.address}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-check">
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleCreateAccount}
                    >Submit</button>
                </form>
            </div>
        </div>
    );
};


export default withRouter(Account);