import React, {useEffect} from 'react'
import './About.css'
import { SiFastapi } from 'react-icons/si';
import AboutCard from './AboutCard';

const About = () => {
    const API_BASE_URL = "http://localhost:8080/api/v1/serviceforsale";
    let [service, setService] = React.useState([]);
       const fetchServices = async () => {
        try {
                 const response = await fetch(API_BASE_URL + "/create", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setService(data);
                } else {
                    const data = await response.json();
                }
        }catch (error) {
            console.log("Error:", error);
        }
    };
    useEffect(() => {
        fetchServices();
    }, []);
    return (
        <div className='about'>
            <div className="container">
                <h2>Geriausia 5G tiekeja Lietuvoje</h2>
                <p>Neradote atsakymo į iškilusius klausimus? Parašykite mums. Atsakysime jums el. paštu</p>
                <div className="card-container">
                    {service.map((item, index) => (
                        <div key={index} className="card">
                            <AboutCard
                                icon={<SiFastapi className='icon' />}
                                heading={item.serviceName}
                                text={item.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default About