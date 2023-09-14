import React from 'react';
import supabase from '../config/supabase';

function EmailAuths() {
  
  const emailAuth = async () => {
    const { user, error } = await supabase.auth.signUp({
       email:'ajith07@gmail.com',
       password:'12345678',
    });

    if (error) {
      console.error('Error signing in:', error.message);
    } else {
      console.log('User signed in:', user);
    }
  }


  return (
    <div>
      <button onClick={emailAuth}>Email Authentication</button>
    </div>
  );
}

export default EmailAuths;
