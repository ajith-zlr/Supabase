import React, { useState } from 'react'
import supabase from '../config/supabase';

function EmailAuthentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlechange = (e) => {
    setEmail(e.target.value);

  }
  const handlechange1 = (e) => {
    setPassword(e.target.value);

  }
  

  const handlesubmit = async () => {
    console.log(email, "emailssss");
    try {
   
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });
      console.log("supabase signup");
      if (error) {
        console.error('Errr signing up:', error.message);
      } else {
        console.log('User signed up:', user);
        // You can display a success message or navigate to the login page
      }
    } catch (error) {
      console.error('Catch error signing up:', error.message);
    }
  };


  return (
    <div>
      <form>


        <input placeholder='email' name='Email' value={email} onChange={handlechange}>

        </input>
        <input placeholder='Password' name='password' value={password} onChange={handlechange1}>

        </input>
        <button onClick={handlesubmit} type='submit'> submit</button>
      </form>
    </div>
  )
}

export default EmailAuthentication