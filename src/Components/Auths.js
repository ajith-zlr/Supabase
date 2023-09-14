import React, { useEffect, useState } from 'react'
import supabase from '../config/supabase'
import { v4 as uuidv4 } from "uuid";
import Stroage from './Stroage/Stroage';
import StoreData from './Stroage/StoreData';



function Auths() {
  const [users, setUsers] = useState();
  const [files1, setFiles1] = useState(null);
  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [age, setAge] = useState('');
  const [goggleData, setGoogleData] = useState("");



  const googleAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    setGoogleData(data);

  }

  async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })

    console.log(data, "data");
  }







  const handleUser = async () => {
    const user = await supabase.auth.getUser();
    console.log(user, "usere");


    setUsers(user.data.user);



  }

  console.log(users, "usersdata11");

  const getImages = async () => {
    alert("dfghjkl");



  }

  const LogOut = () => {
    supabase.auth.signOut()
  }

  useEffect(() => {
    handleUser();
  }, [])

  const UploadImage = async (e) => {

    let file = e.target.files[0];
    setFiles1(file);


    const { data, error } = await supabase.storage.from('Images').upload(users, + "/" + uuidv4(), files1);

    if (data) {

      getImages();

    }

  }

  const upsertData = async () => {
    const { data, error } = await supabase
      .from('UpsertData')
      .upsert({ name: name, age: age, surName: surName })
      .select()
    if (data) {
      console.log(data, "data");
    }

  }

  return (
    <div>

      <button onClick={googleAuth}>LoginInwithGoogle</button>
      <button onClick={signInWithGitHub}>signInWithGitHub</button>
      <br></br>StorageData
      <button onClick={LogOut}>Logout</button>
      <input type='file' onChange={(e) => UploadImage(e)}></input>
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} ></input>
      <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} ></input>
      <input type="text" name="surName" value={surName} onChange={(e) => setSurName(e.target.value)} ></input>

      <button onClick={upsertData}>UpsertData</button>

      <StoreData userData={users} />

    </div>
  )
}

export default Auths