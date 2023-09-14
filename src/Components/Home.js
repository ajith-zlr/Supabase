import React, { useState } from 'react'
import supabase from '../config/supabase';
import { useEffect } from 'react';


function Home() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getCountries();
    }, []);

    async function getCountries() {
        const { data } = await supabase.from("datauser").select();
        setCountries(data);
    }
    console.log(countries,"ccccccc");

    return (
    
        <ul>
            {countries.map((country) => (
                <li key={country.name}>{country.name}</li>
            ))}
        </ul>
    );


}

export default Home