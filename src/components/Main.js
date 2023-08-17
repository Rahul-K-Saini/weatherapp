import React, { useEffect, useState } from 'react';
import './CSS/style.css';

const Main = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Delhi");

    useEffect(() => {
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=4543f0ad659558e27324d363b72b4223`;
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
        <div className='container'>
            <div className='nav'>
                <div className='inputData flex'>
                    <div className='title'>
                        <span class="material-symbols-outlined logo">
                            sunny
                        </span>
                        <p >Weatherapp.</p>
                    </div>
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
            <div className='main_container'>
                <div className='main_wrapper'>
                    {!city ? (
                        <p>No Data Found</p>
                    ) : (
                        <div className='info'>
                            <h2 className='location'>{str2}</h2>
                            <h1 className='temp'>
                                {Math.round(city.temp)}&deg;C
                            </h1>
                            {weatherData && weatherData.length > 0 ? (
                                <img
                                    src={`${iconBaseUrl}${weatherData[0].icon}.png`}
                                    alt={weatherData[0].description}
                                    className='weather-icon'
                                />
                            ) : null}
                            <p className='description'>{weatherData[0].main}</p>
                            <h3 className='temp_min_max'>
                                Min: {Math.round(city.temp_min)}&deg;C | Max: {Math.round(city.temp_max)}&deg;C
                            </h3>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Main;
