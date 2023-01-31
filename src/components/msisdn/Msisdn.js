import React, { useState, useEffect } from "react";
import { withRouter } from '../router/withRouter';
import "./Msisdn.css";
import { accountID } from '../account/Account';

export const msisdnID = {value:0};

const API_BASE_URL = "http://localhost:8080/api/v1/msisdn";

const Msisdn = () => {
    const [msisdn, setMsisdn] = useState([]);
    const [editingMsisdn, setEditingMsisdn] = useState(null);
    const [state, setState] = useState({
        id: "",
        activeFrom: "",
        activeTo: "",
        accountId: "",
        successMessage: null,
        postSuccessMessage: null,
        selectedAccountId: null
    });

    const handleEdit = (id, msisdn) => {
        setEditingMsisdn(id);
        setState({
            ...msisdn,
            successMessage: null,
            postSuccessMessage: null
        });
    };

    const handleSelect = (id) => {
        setState(prevState => ({
            ...prevState,
            selectedAccountId: id,
        }));
        setId(id);
    };

    const setId = (id) => {
        msisdnID.value = id;
        alert("You have selected msisdn with id: " + msisdnID.value);
    }


    const handleUpdateFormSubmit = (e) => {
        e.preventDefault();
        handleMsisdnUpdate(editingMsisdn, state);
        setEditingMsisdn(null);
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
                setMsisdn(data);
                setState(prevState => ({
                    ...prevState,
                    successMessage: 'Msisdn Fetch Successful.'
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
            accountId: accountID.value
        };

        try {
            if(accountID.value===null || accountID.value===undefined || accountID.value==="" || accountID.value==="0" || accountID.value===0) {
                setState(prevState => ({
                    ...prevState,
                    postSuccessMessage: 'Please select a Account.'
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
                        postSuccessMessage: 'Msisdn created successfully.'
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
                const updatedMsisdn = msisdn.map((msisdn) => {
                    if (msisdn.id === id) {
                        return { ...msisdn, ...updatedMsisdn };
                    }
                    return msisdn;
                });
                setMsisdn(updatedMsisdn);
                setState(prevState => ({
                    ...prevState,
                    successMessage: 'Msisdn updated successfully'
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
                setMsisdn(msisdn.filter((msisdn) => msisdn.id !== id));
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
            <h1>Accounts</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Active From</th>
                    <th>Active To</th>
                    <th>Account</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {msisdn.map((msisdn) => (
                    <tr key={msisdn.id}>
                        <td>{msisdn.id}</td>
                        <td>{msisdn.activeFrom}</td>
                        <td>{msisdn.activeTo}</td>
                        <td>{msisdn.accountId}</td>
                        <td>
                            {editingMsisdn !== msisdn.id ? (
                                <>
                                    <button className="button" onClick={() => handleEdit(msisdn.id, msisdn)}>Update</button>
                                    <button className="button" onClick={() => handleDeleteMsisdn(msisdn.id)}>Delete</button>
                                    <button className="button" onClick={() => handleSelect(msisdn.id)}>Select</button>
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


export default withRouter(Msisdn);