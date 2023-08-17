import React, { useEffect, useState } from 'react';
import './CSS/style.css';

const Main = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Delhi");

    useEffect(() => {
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4543f0ad659558e27324d363b72b4223`;
            const response = await fetch(url);
            const resJSON = await response.json();
            setCity(resJSON.main);
            setWeatherData(resJSON.weather); 
        };
        fetchApi();
    }, [search]);

    const iconBaseUrl = "http://openweathermap.org/img/w/";
    const str = search;
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return (
        <>
            <div className='container'>
                <div className='inputData'>
                    <input
                        type="search"
                        className='inputField'
                        placeholder='Enter Location Here'
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                    />
                </div>
            </div>
            {!city ? (
                <p>No Data Found</p>
            ) : (
                <div className='info'>
                    <h2 className='location'>{str2}</h2>
                    <h1 className='temp'>
                        {Math.ceil(city.temp - 273)}&deg;C
                    </h1>
                    {weatherData && weatherData.length > 0 ? (
                        <img
                            src={`${iconBaseUrl}${weatherData[0].icon}.png`}
                            alt={weatherData[0].description}
                            className='weather-icon'
                        />
                    ) : null}
                    <p>{weatherData[0].main}</p>
                    <h3 className='temp_min_max'>
                        Min: {Math.ceil(city.temp_min - 273)}&deg;C | Max: {Math.ceil(city.temp_max - 273)}&deg;C
                    </h3>
                </div>
            )}
        </>
    );
}

export default Main;
