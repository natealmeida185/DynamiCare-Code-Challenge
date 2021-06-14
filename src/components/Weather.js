/* 
    Name: Nathan Almeida
    Project: DynamiCare Intern Code Challenge
    Date: 06/14/2021
    Purpose: Query Weather Forecase dependant on area and store previously searched Zip Codes
*/

import React, { useState } from 'react';
import Search from './Search';
import Map from './Maps';

//store weather API info
const weatherAPI = {
    key: "145e1abe4b3342c582585653276d6d80",
    base: "https://api.openweathermap.org/data/2.5/"
}

export default function Weather() {
    //instantiate states
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [tempList] = useState([]);

    //function used to check key press and api call
    const search = e => {
        if(e.key === "Enter") {
            //get API key from Open Weather, get queried input, and set units to imperial
            fetch(`${weatherAPI.base}weather?zip=${query}&units=imperial&appid=${weatherAPI.key}`)
                .then(res => res.json())
                .then(result => {
                    //set weather to recieved string
                    setWeather(result);
                    //clear search bar once 'entered' is pressed
                    setQuery('');
                })
                //Catch error if api request could not be made
                .catch((error) => {
                    console.error('API request could not be made', error);
                });
            //add prev searched zip code to list if not null
            if (query != null) {
                tempList.push(query);
            }
        }
    }

    return (
        <div className="weather container">
            <h1 id="weather-title">Weather Map Application</h1>

            {/* implement the Search component and pass in needed props */}
            <Search setQuery = {setQuery} query={query} search={search}/>

            {/* check if weather is not undefined, display weather in °F */}
            {(typeof weather.main != "undefined") ? (
            <div className="weather-temp">
                <h1>{Math.round(weather.main.temp)}°F</h1>   
            </div>
            ) : ('')}

            <div className="temp-list">
                <ul>
                    {/* Map through prev search zip codes to display them and add onClick to research the zip code */}
                    {tempList.map((temps, index) => {
                        return (
                        <h2 onClick={() => setQuery(temps)} key={index}>{temps}</h2>
                        )
                    })}
                </ul>
            </div>

            {/* implement the Map component and pass in needed props */}
            <Map query={query}/>
        </div>
    )
}