import React from "react";
import BeeVideo from "../../assets/bite_video.mp4";
import "./Bee.css";

const bee = () => {
    return (
        <div className='bee'>
            <video autoPlay loop muted id='video'>
                <source src={BeeVideo} type='video/mp4'/>
            </video>
            <div className="bee-text">
                <h1>Bite</h1>
                <h1><span className="yellow">Mobiliosios paslaugos ir ne tik!</span></h1>
                <p>Testinis back-front end, padarytas Karolio.</p>
                <div className="btn-group">
                    <button className="btn">Register/Login</button>
                    <button className="btn">FAQ</button>
                </div>
            </div>
        </div>
    );
}

export default bee;