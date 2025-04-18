import React from "react";
import outsideairport from"../Images/outsideairport.jpeg";

const Home = () => {
    return (
        <div className="home-container">
            <p className="home-text">
                <span className="home-text-bold">
                    Welcome to the Airport App
                </span>
                <span className="home-text-block">
                    This application allows you to manage various aspects of airport operations.
                </span>
                <span className="home-text-italic">
                    <i>
                        You can view and manage flights, gates, passengers, and aircrafts.
                    </i>
                </span>
            </p>
            <img src={outsideairport} alt="Outside of Airport" className="homeImgAirport-icon" />
        </div>
    );
};

export default Home;