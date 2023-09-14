import React, { useEffect, useState } from 'react';
import supabase from '../config/supabase';

function Create() {
    const [user, setUser] = useState('');
    const [age, setAge] = useState('');
    const [fetch, setFetch] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null); // Step 1
    const [name,setName] = useState('');
    const [surName,setsurName] = useState('');
    const [id,setId] =useState('');


const [file,setFile] = useState([]);
    useEffect(() => {
        fetchData();
    }, [user]);

    async function fetchData() {
        const { data, error } = await supabase.from("datauser").select();
        if (error) {
            console.error("Error fetching data:", error.message);
        } else {
            setFetch(data);
        }
    }

    const deleted = async (id) => {
        console.log(id);
        const { error } = await supabase
            .from('datauser')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Error deleting data:", error.message);
        } else {
            // If deletion is successful, re-fetch the data
            fetchData();
        }
    }

    const Updated = async (id) => {
        setIsUpdate(true);
        setSelectedItemId(id);
        const selectedItem = fetch.find(item => item.id === id); 
        setUser(selectedItem.name);
    }

    const handleUpdate = async () => {
        const { error } = await supabase
            .from('datauser')
            .update({ name: user, age: age })
            .eq('id', selectedItemId); 

        if (error) {
            console.error("Error updating data:", error.message);
        } else {
           
            fetchData(); // Refetch data after update
            setIsUpdate(false); // Clear the update mode
            setSelectedItemId(null); // Clear the selected item for update
            setUser(''); // Clear input fields
            setAge('');
        }
    }

    const handleChange = (e) => {
        setUser(e.target.value);
        
    }

    const handleChange1 = (e) => {
        setAge(e.target.value);
    }

    const Images = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files,"fghjk");
        
    }

    const Upload = async () => {
        if (file) {
          const { data, error } = await supabase.storage.from('Albums').upload(`${file.name}`, file,{
            cacheControl: "3600",
            upsert: false,
          });
          if (error) {  
            console.error('Error uploading file:', error.message);
          } else {
            console.log('File uploaded successfully:', data);
          }
        }
      };

    async function createUser() {
        const { data, error } = await supabase.from("datauser").insert({
            name: user,
            age: age,
        });
        setUser('');
        setAge('');
        if (error) {
            console.error("Error inserting data:", error.message);
        } else {
            // If insertion is successful, re-fetch the data
            fetchData();
        }
    }

    async function upsertData() {
        try {
         
         
          const { data, error } = await supabase
            .from('UpsertData')
            .upsert(
              [
                {
            id:id,
               name:name,
               surname:surName,
                },
              ],
              { onConflict: ['id'] } 
            );
            console.log('Upserted user:', data);
          if (error) {
            console.error('Error:', error.message);
            return;
          }
      
          if (data) {
            console.log('Upserted user:', data[0]);
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      }
    

    return (
        <div>
            {fetch && fetch.map((fe) => (
                <div key={fe.id}>
                    <button onClick={() => deleted(fe.id)}>Delete</button>
                    <button onClick={() => Updated(fe.id)}>Update</button>
                    {!isUpdate || selectedItemId !== fe.id ? (
                        <ul>{fe.name}</ul>
                    ) : (
                        <div>
                            <input
                                type="text"
                                placeholder="New Name"
                                name="name"
                                value={user}
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                type="number"
                                placeholder="New Age"
                                name="age"
                                value={age}
                                onChange={handleChange1}
                            />
                            <br />
                            <button onClick={handleUpdate} type="submit">Save</button>
                        </div>
                    )}
                </div>
            ))}

            <input
                type="text"
                placeholder="Name"
                name="name"
                value={user}
                onChange={handleChange}
            />
            <br />
            <br />
            <input
                type="number"
                placeholder="Age"
                name="age"
                value={age}
                onChange={handleChange1}
            />
            <br />
            <br />
            <button onClick={createUser}  type="submit">Create</button>
            <br/>
            <br/>
           <input type='file' name='file'  onChange={(e)=>Images(e)} ></input>
           <button onClick={Upload}>UploadToStroage</button>
           <button onClick={upsertData}>UpsertData</button>
           <input type ="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} ></input>
           <input type ="text" name="surName" value={surName} onChange={(e)=>setsurName(e.target.value)} ></input>
           <input type ="number" name="id" value={id} onChange={(e)=>setId(e.target.value)} ></input>
        </div>
    );
}

export default Create;
