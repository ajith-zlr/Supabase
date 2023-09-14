import { Auth } from '@supabase/auth-ui-react';

import Create from './Components/Create';
import Create1 from './Components/Create1';
import Home from './Components/Home';
import supabase from './config/supabase';
import Auths from './Components/Auths';
import EmailAuths from './Components/EmailAuths';
import EmailAuthentication from './Components/EmailAuthentication';
import MyComponent from './Components/Create';
import Stroage from './Components/Stroage/Stroage';
import StoreData from './Components/Stroage/StoreData';

import EmailAuth from './Components/EmailAuthentication';
import TodoProject from './Components/TodoProject';

function App() {
 
  return (
    <div className="App">
      <TodoProject/>
    </div>
  );
}

export default App;
