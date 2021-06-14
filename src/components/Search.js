/* 
    Name: Nathan Almeida
    Project: DynamiCare Intern Code Challenge
    Date: 06/14/2021
    Purpose: JSX for Search bar that sets the queried zip code to the users input value
*/

import React from 'react';

export default function Search({setQuery, query, search}) {
    return (
        <>
        <div className="search-box">
            <input 
                type="text" 
                placeholder="Enter Zip Code" 
                onChange = {e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
            />
        </div>
        </>
    )
}