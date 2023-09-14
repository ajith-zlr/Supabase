import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import { Button, FormHelperText, Input, InputLabel } from '@mui/material';
import supabase from '../../config/supabase';

function Stroage() {


    const [email,setEmail] =  useState("");

    console.log(email);



    const signIn = async () => {
      try {
        const { data, error } = await supabase.auth.signInWithOtp({
          email: email,
        });
    
        if (error) {
          console.error("Authentication error:", error.message);
        } else {
          console.log("Authentication successful:", data);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    
  return (
    <div style={{marginTop:'100px'}}>
<FormControl >
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input type='text' name="email" value={email} onChange={(e)=> setEmail(e.target.value)}></Input>
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
  <Button variant="contained" onClick ={()=>signIn()}>Contained</Button>
</FormControl>
    </div>
  )
}

export default Stroage