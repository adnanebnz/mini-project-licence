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
          console.log(data)
    
      };
      fetchData();

  
    },[])
    return (
      <div className="mt-11 mb-10">
        
          </div>
    );}
  
  export default Product;