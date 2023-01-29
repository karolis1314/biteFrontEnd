import React, {useState} from 'react';
import './Login.css';
import {API_BASE_URL} from '../../constants/apiConstants';
import { withRouter } from '../router/withRouter';

function LoginForm() {
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

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmitClick = async (e) => {
        e.preventDefault();

        const payload = {
            email: state.email,
            firstName: state.firstName,
            lastName: state.lastName,
            companiesName: state.companiesCode,
            companiesCode: state.companiesCode,
            personalCode: state.personalCode,
        };

        try {
            const response = await fetch(API_BASE_URL + "/customer", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                setState(prevState => ({
                    ...prevState,
                    successMessage: 'Customer created successfully, with id: ' + data.id
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

    return(
        <div className="loginForm">
            <h1 className="loginFormHeader">{state.successMessage}</h1>
            <form className="form">
                <div className="loginFormComp">
                    <label htmlFor="firstName">First Name</label>
                    <input type="firstName"
                           className="form-control"
                           id="firstName"
                           placeholder="Enter First Name"
                           value={state.firstName}
                           onChange={handleChange}
                    />
                </div>
                <div className="loginFormComp">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="lastName"
                           className="form-control"
                           id="lastName"
                           placeholder="Enter Last Name"
                           value={state.lastName}
                           onChange={handleChange}
                    />
                </div>
                <div className="loginFormComp">
                    <label htmlFor="email">Email address</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           placeholder="Enter email"
                           value={state.email}
                           onChange={handleChange}
                    />
                </div>
                <div className="loginFormComp">
                    <label htmlFor="companiesName">Companies Name</label>
                    <input type="companiesName"
                           className="form-control"
                           id="companiesName"
                           placeholder="Enter Companies Name"
                           value={state.companiesName}
                           onChange={handleChange}
                    />
                </div>
                <div className="loginFormComp">
                    <label htmlFor="companiesCode">Companies Code</label>
                    <input type="companiesCode"
                           className="form-control"
                           id="companiesCode"
                           placeholder="Enter Companies Code"
                           value={state.companiesCode}
                           onChange={handleChange}
                    />
                </div>
                <div className="loginFormComp">
                    <label htmlFor="personalCode">Personal Code</label>
                    <input type="personalCode"
                           className="form-control"
                           id="personalCode"
                           placeholder="Enter Personal Code"
                           value={state.personalCode}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-check">
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
        </div>
    )
}

export default withRouter(LoginForm);