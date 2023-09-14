import React, { useEffect, useState } from 'react';
import supabase from '../config/supabase';

function Create1() {
    const [insert,setInsert] = useState("");

    useEffect(()=> {
        const fetch = async() => {
            const { error} = await supabase
            .from('countries')
            .insert({ id: 1, name: 'Denmark' })
        }

        fetch();
    },[]);
  

  return (
    <div>Create1</div>
  )
}

export default Create1