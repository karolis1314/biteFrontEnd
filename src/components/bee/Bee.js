import React from "react";
import BeeVideo from "../../assets/bite_video.mp4";
import "./Bee.css";

const bee = () => {
    return (
        <div className='bee'>
            <video autoPlay loop muted id='video'>
                <source src={BeeVideo} type='video/mp4'/>
            </video>
        </div>
    );
}

export default bee;