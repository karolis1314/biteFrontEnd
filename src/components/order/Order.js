import React, { useState, useEffect } from "react";
import { withRouter } from '../router/withRouter';
import "./Order.css";
import { msisdnID } from '../msisdn/Msisdn';

const API_BASE_URL = "http://localhost:8080/api/v1/orders";

const Order = () => {
    const [order, setOrder] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    const [state, setState] = useState({
        id: "",
        name: "",
        activeFrom: "",
        activeTo: "",
        selectedOptionId: "1",
        msisdnId: "",
        successMessage: null,
        postSuccessMessage: null,
    });

    const handleEdit = (id, order) => {
        setEditingOrder(id);
        setState({
            ...order,
            successMessage: null,
            postSuccessMessage: null
        });
    };

    const handleUpdateFormSubmit = (e) => {
        e.preventDefault();
        handleMsisdnUpdate(editingOrder, state);
        setEditingOrder(null);
    };

    useEffect(() => {
        fetchMsisdn();
    }, []);

    const fetchMsisdn = async () => {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setOrder(data);
                setState(prevState => ({
                    ...prevState,
                    successMessage: 'Orders Fetch Successful.'
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

    const handleCreateMsisdn = async (e) => {
        e.preventDefault();

        const payload = {
            name: "Order for MSISDN " + msisdnID.value,
            serviceId: state.selectedOptionId,
            msisdnId: msisdnID.value
        };

        alert(state.selectedOptionId)
        try {
                if (msisdnID.value===null || msisdnID.value===undefined || msisdnID.value==="" || msisdnID.value==="0" || msisdnID.value===0) {
                setState(prevState => ({
                    ...prevState,
                    postSuccessMessage: 'Please select a Msisdn.'
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
                        postSuccessMessage: 'Order created successfully.'
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

    const handleMsisdnUpdate = async (id, updatedMsisdn) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedMsisdn),
            });
            if (response.ok || response.status === 200) {
                const updatedMsisdn = order.map((order) => {
                    if (order.id === id) {
                        return { ...order, ...updatedMsisdn };
                    }
                    return order;
                });
                setOrder(updatedMsisdn);
                setState(prevState => ({
                    ...prevState,
                    successMessage: 'Order updated successfully'
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

    const handleDeleteMsisdn = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok || response.status === 200) {
                setOrder(order.filter((order) => order.id !== id));
                setState(prevState => ({
                    ...prevState,
                    successMessage:'Msisdn deleted successfully'
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
            <h1>Orders</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Active From</th>
                    <th>Active To</th>
                    <th>Service</th>
                    <th>MSISDN</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {order.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.name}</td>
                        <td>{order.activeFrom}</td>
                        <td>{order.activeTo}</td>
                        <td>{order.serviceId}</td>
                        <td>{order.msisdnId}</td>
                        <td>
                            {editingOrder !== order.id ? (
                                <>
                                    <button className="button" onClick={() => handleEdit(order.id, order)}>Update</button>
                                    <button className="button" onClick={() => handleDeleteMsisdn(order.id)}>Delete</button>
                                </>
                            ) : (
                                <>
                                    <button className="button" onClick={handleUpdateFormSubmit}>Update</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
            <div>
                <label>
                    Select an service:
                    <select onChange={e => setState({ selectedOptionId: e.target.value })}>
                        <option value="1">5G</option>
                        <option value="2">4G</option>
                        <option value="3">3G</option>
                        <option value="4">2G</option>
                    </select>
                </label>
            </div>
            <div>
                {state.postSuccessMessage && <div className="success-message">{state.postSuccessMessage}</div>}
                <button
                    type="submit"
                    className="create"
                    onClick={handleCreateMsisdn}
                >Create MSISDN</button>
            </div>
        </div>
    );
};


export default withRouter(Order);