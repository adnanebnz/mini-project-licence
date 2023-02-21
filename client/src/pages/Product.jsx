import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StarIcon from "@mui/icons-material/Star";

import axios from 'axios';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Product = () => {
    const {id} = useParams()
    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
          const res = await axios.get(`http://localhost:8800/api/items/${id}`);
          setData(res.data);    
      };
      fetchData();
      console.log(data)
    },[])
    return (
      <div className="my-20">
        <div className=''>
        <img src={data.img} className="h-96"/>
    </div>
        <p> title is{data.title}</p>
        <p>description is {data.desc}</p>
        <p> rating is{data.rating}</p>
        <p>{data.desc}</p>
        <p> category is {data.categorie}</p>
        <p>price is {data.price}</p>
            <div>
        </div>
        </div>
    );}
  
  export default Product;