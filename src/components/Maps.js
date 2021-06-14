/* 
    Name: Nathan Almeida
    Project: DynamiCare Intern Code Challenge
    Date: 06/14/2021
    Purpose: Set default map to Boston area, then change coordinates based on inputted zip code
*/

import React, {useRef, useEffect, useState} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

//store MapBox API info
const mapAPI = {
    base: "https://api.mapbox.com/geocoding/v5/",
    token: "pk.eyJ1IjoibmF0ZWFsbWVpZGExOCIsImEiOiJja3B2bzVmNjAwYWY3Mm9tcmtnN2thMDgwIn0.SmxeWecfd_9svL5hugJezQ"
}
mapboxgl.accessToken = "pk.eyJ1IjoibmF0ZWFsbWVpZGExOCIsImEiOiJja3B2bzVmNjAwYWY3Mm9tcmtnN2thMDgwIn0.SmxeWecfd_9svL5hugJezQ";

export default function Maps({query}) {
    //instantiate states and references
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);
    const [endpoint, setEndPoint] = useState('');
    const [searchTxt, setSearchTxt] = useState([]);
    const [lng, setLng] = useState('-70.9');
    const [lat, setLat] = useState('42.35');

    //display map on initial load (Boston as default location [lng, lat])
    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: 10
        });
        //display marker on map
        marker.current = new mapboxgl.Marker(({
            container: mapContainer.current,
            color: "#eb4034",
            draggable: false
        })).setLngLat([lng, lat])
        .addTo(map.current);

        //set MapBox default endpoint (place)
        setEndPoint('mapbox.places'); 
        //set inputted zip code to searchTxt for API fetching
        setSearchTxt(query);
    }, [query, endpoint, searchTxt, lng, lat]);

    //function used to query MapBox to find the inputted Zip Code's coordinates
    const queryMap = () => {
        if(searchTxt.length === 5 || searchTxt.length === 10) {
            //get API base link, endpoint, queried zipcode, and API key
            fetch(`${mapAPI.base}${endpoint}/${searchTxt}.json?access_token=${mapAPI.token}`)
            .then(res => res.json())
            .then(result => {
            //set Lng and Lat states from results' index
            setLng(result.features[0].bbox[0]);
            setLat(result.features[0].bbox[1]);
            })
            //Catch error if api request could not be made
            .catch((error) => {
                console.error('API request could not be made', error);
            });
        }
    }
    //run the queryMap function
    queryMap();

    return (  
        <div className="map container">
            {/* return the rounded coordinates and map */}
            <h1>Coordinates: {Math.round(lng * 100) / 100}, {Math.round(lat * 100) / 100}</h1>
            <div ref={mapContainer} className="mapbox" />
        </div> 
    )
}