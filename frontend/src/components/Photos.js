/* This component will help render the images generated by the Image generator model */

import { useEffect, useState } from 'react'
import axios from 'axios'
import { ImageList, ImageListItem, colors } from '@mui/material'
import {LinearProgress } from '@mui/material'
// import lottie from 'lottie-web';
// import { defineElement } from 'lord-icon-element';

// define "lord-icon" custom element with default properties
// defineElement(lottie.loadAnimation);


const Photos = ({ prompt }) => {
    const [photos, setPhotos] = useState([]);
    const [imageUrl,setImageUrl]=useState('');

    useEffect(() => {
        const query = async (data) => {
            if(prompt.length > 0){
          try {
            const response = await fetch('https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5', {
              headers: { Authorization: 'Bearer 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' },
              method: 'POST',
              body: JSON.stringify(data),
            });
            const result = await response.blob();
            const url = URL.createObjectURL(result);
            setImageUrl(url);
            // console.log(typeof(prompt));
            add_img(url);
          } catch (error) {
            console.error('Error:', error);
          }
        }

        };
    
        query({ inputs: prompt });
      }, [prompt]);

      const add_img=(url)=>{
        var photo_container=document.getElementById('photo-container');
        var img_tag=document.createElement("img");
        img_tag.style.marginTop="20px"
        var bruh1=document.createElement("br");
        var bruh2=document.createElement("br");
        
        img_tag.src=url;
        
        
        img_tag.className="imgs"
        photo_container.appendChild(img_tag);
        photo_container.appendChild(bruh1);
        photo_container.appendChild(bruh2);
        
        photo_container.scrollTop = photo_container.scrollHeight;
        const progressbar2=document.getElementById("progressbar2");
        progressbar2.style.display="none";  
      }
    return (

        <div className='photo-container' id='photo-container'>
            
            
            {/* <ImageList sx={{ height: 350 }}>
                {photos.map((photo, index) => (
                    <ImageListItem key={index}>
                        <img
                            src={photo.url}
                            
                            alt={photo.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                    
                ))}
            </ImageList> */}
           
            {/* <LinearProgress id ="progressbar2"  color="secondary" style={{ top: "99%" , borderRadius: 3 , width: "99.7%" , left: "0.3%",borderRadius:"5px"}} />   */}
            <div id="progressbar2" style={{ position: "fixed", top: "82%", width: "33.9%", right: "2.7%",display:"none" }}>
        <LinearProgress color="secondary" style={{ borderRadius: 3 }} />
      </div>
        </div>
        
        
    )
}

export default Photos