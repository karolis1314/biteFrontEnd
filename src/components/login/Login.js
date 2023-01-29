import React, {useState} from 'react';
import axios from 'axios';
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
        try {
            const payload = {
                email: state.email,
                firstName: state.firstName,
                lastName: state.lastName,
                companiesName: state.companiesCode,
                companiesCode: state.companiesCode,
                personalCode: state.personalCode,
            };

            axios.post(API_BASE_URL + "/customer", payload).then((res) => {

                if (res.status === 201) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Customer created successfully, with id: ' + res.data.id
                    }))
                } else if (res.status === 204) {
                    alert(res.data.message);
                } else {
                    alert(res.data.message);
                }
            });
        }catch (error) {
            alert(error);
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