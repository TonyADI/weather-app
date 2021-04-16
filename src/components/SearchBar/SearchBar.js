import React, { useState } from 'react';
import './SearchBar.css'

export const SearchBar = props => {
    const [term, setTerm] = useState('')

    const handleChange = e => {
        setTerm(e.target.value)
    }

    const handleKeyPress = e => {
        if(e.which === 13){
            props.handleSearch(term)
        }
    }
    return(
        <div className="search-container">
            <i className="fa fa-search icon"></i>
            <input value={term} placeholder="Enter City..." 
            onChange={handleChange} className="search-bar" 
            onKeyPress={handleKeyPress}></input>
        </div>
    )
}