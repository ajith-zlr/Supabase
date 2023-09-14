import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import supabase from '../../config/supabase';
import { useUser } from "@supabase/auth-helpers-react";


function StoreData() {

    const [file, setfile] = useState([]);
    const [store, setStore] = useState([]);
    const [images, setImages] = useState([]);

    const [download,setDownlod] = useState([]);
    const [files,setFiles] = useState([]);



    const Replace = async(img) => {

        console.log(files,"files");
        const { data, error } = await supabase
        .storage
        .from('new')
        .update('newFolder/' + `${img}`, files, {
          cacheControl: '3600',
          upsert: true
        })

        if(data){
          
            console.log(data);
        }
        else{
            console.log(error);  
        }
    }

    const handleFileSelected1 = (e) => {
        setFiles(e.target.files[0]);
        console.log(e.target.files[0],"filled"); 
    };

    const image = [];

    
    const url = "https://raejzipzwomohblrufcm.supabase.co/storage/v1/object/public/new/newFolder"

    useEffect(() => {
        const user = supabase.auth.getUser;
        console.log(user, "user");
    })


    const handleFileSelected = (e) => {
        setfile(e.target.files[0]);
    };


    const createBucket = async () => {

        const { data, error } = await supabase
            .storage
            .createBucket('ak1', {
                public: false,
                allowedMimeTypes: ["image"],
                fileSizeLimit: 1024
            })


    }

    const list = async () => {
        const { data, error } = await supabase
            .storage
            .listBuckets()

        console.log(data, "data");
    }

    const UpdateBucket = async () => {
        const { data, error } = await supabase.storage.updateBucket('ak1', {
            public: true,
            allowedMimeTypes: [image],
            fileSizeLimit: 1024

        })
        console.log(data);
    }

    const emptyBucket = async () => {
        const { data, error } = await supabase.storage.emptyBucket('new')
   

    }
  
    const downLoadFile = async (image) => {
            const { data, error } = await supabase
            .storage
            .from('new')
            .download("newFolder/" + `${image}`);
                const blob = new Blob([data], { type: 'image/png/webp' });


               
        const url = window.URL.createObjectURL(blob);

            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'downloaded-image.webp'; 
            anchor.click();

            window.URL.revokeObjectURL(url);
            console.log('Image downloaded successfully');



    }

    const allFilesImages = async () => {

        const { data, error } = await supabase
            .storage
            .from('new')
            .list('newFolder', {
                limit: 100,
            })
        setImages(data);
    }
    
    images.map((ele) => (
        image.push({
            names: ele.name,
        })
        
        ))
    


    const handleSubmit = async () => {

        const filename = `${uuidv4()}-${file.name}`;


        const { data, error } = await supabase.storage
            .from("new")
            .upload(filename, file, {
                cacheControl: "3600",
                upsert: false,
            });
    };

    const getBuckets = async () => {
        const { data, error } = await supabase.storage.getBucket('new');
        console.log(data, "data");
    }

    const listOfBuckets = async () => {

        const { data, error } = await supabase
            .storage
            .from('new')
            .list('newFolder', {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' },
            })
    }

    const deleteBucket = async () => {
        const { data, error } = await supabase
            .storage
            .deleteBucket('ak1')
    }

   const move = async(image) => {

    const { data, error } = await supabase
  .storage
  .from('new')
  .move("newFolder/" + `${image}`, 'images/' + `${image}`);
   }

  const copy = async(image) =>{

    console.log(image,"newimagess");
    const { data, error } = await supabase
  .storage
  .from('new')
  .copy("newFolder/" + `${image}`, 'images/' + `${image}`);
  }


    return (
        <>

         <input type="file" name="images" onChange={handleFileSelected1}></input>
            <button onClick={handleSubmit} type="submit">Upload image</button>
    <input type="file" name="image" onChange={handleFileSelected}></input> 
     <button type='submit' onClick={allFilesImages} >allFilesImages</button>
    


          
            {image.map((image) => (
                <div>
                <img src={url + "/" + image.names} height={100} width={100} />
                <button onClick={()=>downLoadFile(image.names)}>downLoadFile</button>
                <button onClick={()=>move(image.names)}>move </button>
                <button onClick={()=>copy(image.names)}>copy </button>
                <button onClick={()=>Replace(image.names)}>Replace </button>
                </div>
            ))}




        </>

    );
}


export default StoreData