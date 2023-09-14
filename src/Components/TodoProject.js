import React, { useEffect, useState } from 'react'
import "./Todo.css"
import { Alert, Button, Card, CardActions, CardContent, Snackbar, TextField, Typography } from '@mui/material'
import { Add, Send } from '@mui/icons-material'
import supabase from '../config/supabase';

function TodoProject() {

  const [newTodo, setNewTodo] = useState('');
  const [open, setOpen] = React.useState(false);
  const [toDoList, setToDoList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null); // Step 1

  useEffect(() => {
    fetchData();
  }, [newTodo]);

  async function fetchData() {
    const { data, error } = await supabase.from("ToDo").select();
    if (error) {
      console.error("Error fetching data:", error.message);
    } else {
      setToDoList(data);
    }
  }

  const deleted = async (id) => {
    console.log(id);
    const { error } = await supabase
      .from('ToDo')
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
    const selectedItem = toDoList.find(item => item.id === id);
    setNewTodo(selectedItem.name);
  }

  const handleUpdate = async () => {
    const { error } = await supabase
        .from('ToDo')
        .update({ name: newTodo })
        .eq('id', selectedItemId); 

    if (error) {
        console.error("Error updating data:", error.message);
    } else {
       
        fetchData(); // Refetch data after update
        setIsUpdate(false); // Clear the update mode
        setSelectedItemId(null); // Clear the selected item for update
        setNewTodo(''); // Clear input fields
    }
}

  const InsertData = async () => {
    if (newTodo) {

      const { data, error } = await supabase.from("ToDo").insert({
        name: newTodo,
      });

    
      if (error) {
        console.error("Error inserting data:", error.message);
      }
      else {
        setOpen(true);
      }
    }
    setNewTodo('')


  }
 

  return (
    <div className='main'>
      <div className='Card'>
        <Card sx={{ minWidth: 500, minHeight: 700, }}>

          <CardContent>
            <Typography sx={{ fontSize: 30, color: 'black', textAlign: 'center', fontWeight: 'bold' }} color="text.secondary" >
              TODO APP
            </Typography>
            <div style={{ marginTop: '50px', alignItems: 'center', display: 'flex', justifyContent: 'center', gap: 15 }}>
              <TextField label='Add your new Todo' variant="outlined" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
              <Button variant="contained" onClick={InsertData} >Add</Button>

              <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)} >
                <Alert severity="success">Added New Todo successfully !!</Alert>
              </Snackbar>
            </div>
            {toDoList && toDoList?.map((fe) => (
              <Card sx={{display:"flex",flexWrap:"wrap", margin:"22px",backgroundColor:"darkgrey"}}>

              <div key={fe.id} style={{ display: "flex", flexDirection:'row',justifyContent:"space-between",alignItems:"stretch",gap:"20px"}}>
                {!isUpdate || selectedItemId !== fe.id ? (
               <ul>{fe.name}</ul>
                  ) : (
                    <div>
                    <input
                      type="text"
                      placeholder="New Name"
                      name="name"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <br />
                    <button onClick={handleUpdate} type="submit">Save</button>
                  </div>
                )}
                <div style={{display:"flex",}}>
                <button onClick={() => Updated(fe.id)}>Update</button>
                <button onClick={() => deleted(fe.id)} >Delete</button>
                </div>
              </div>
              </Card>
            ))}
          </CardContent>

        </Card>
      </div>
    </div>
  )
}

export default TodoProject