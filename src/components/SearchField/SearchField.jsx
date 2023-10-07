import { useNavigate } from 'react-router-dom';
import './search-field.css';
import React, { useRef } from 'react'

function SearchField() {

    const searchFieldRef = useRef(null),
        navigate = useNavigate();

    function goToCity(e, city) {
        e.preventDefault();

        searchFieldRef.current.value = '';
        navigate(`/city/${city}`);
    }

    return (
        <form onSubmit={(e) => goToCity(e, searchFieldRef.current.value)} className="search-field-container">
            <input ref={searchFieldRef} className="search-field" type="search" name="s" id="seacrh_city" placeholder='Find your city' />
        </form>
    )
}

export default SearchField;