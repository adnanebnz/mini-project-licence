import axios from "axios"
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  CardActionArea,
  Stack,
  Chip
} from "@mui/material";
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import { addToCart } from '../state';

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/items`);
        setItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

  },[])
  return (
    <div className="mt-11 mb-10">
      <Typography
        variant="h1"
        fontSize="26px"
        fontWeight="400"
        textAlign="center"
        
      >
        NOS PRODUITS
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" sx={{marginBottom:"50px",marginTop:"40px"}}>
      <Stack direction="row" spacing={1}>
      <Chip label="Tables" variant="outlined" />
      <Chip label="Chaises" variant="outlined" />
      <Chip label="Tantes" variant="outlined" />
      <Chip label="Vetements" variant="outlined" />
      <Chip label="Boots" variant="outlined" />
    </Stack>
    </Box>
      <Box
        display="flex"
        padding="0px 15px"
        sx={{
          flexDirection: {
            sm: "row",
            xs: "column",
          },
          justifyContent: "space-between",
          gap:{
            sm:"4rem",
            xs:"1rem"
        }}}
      >
        <div style={{ flex: "1" }} className="mb-10">
          <div className="border border-solid border-[#343434] p-3 w-full">
            <Typography fontWeight="400" textAlign="center">FILTRER</Typography>
            <div className="flex items-center justify-content-center">
           
              
            </div>
          </div>

        </div>
        {/* ITEMS */}
        <div
          className="flex flex-wrap gap-9"
          style={{ flex: 7 }}
        >
          {items.map((item) => (
            <div key={item._id}>
              <Card sx={{ maxWidth:"300px",cursor:"pointer"}} raised>
                <CardActionArea onClick={()=>navigate(`${item._id}`)}>
                <CardMedia
                  component="img"
                  height="140"
                  sx={{maxHeight:"200px"}}
                  image={item.img}
                />
                <CardContent>
                  <Typography gutterBottom fonSize="18px" variant="h6" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc.substring(0, 80)}...
                  </Typography>
                  <Box display="flex" justifyContent="center" alignItems="center" marginTop="10px" gap="0.5rem">
                    <Box bgcolor="#FFEA28" padding="0.35rem" borderRadius="7px">
                  <Typography variant="h4" fontSize="18px" sx={{fontWeight:500,color:"#343434"}}>{item.price} DZD</Typography>
                  </Box>
                  </Box>
                </CardContent>
                </CardActionArea>
                <CardActions>
                  <Box display="flex" alignItems="center" justifyContent="center" gap="20px">
                    <Box  display="flex" alignItems="center" sx={{border:1,borderColor:"#343434"}}>
                  <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color="black">{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
              </Box>
              <Box>
                  <Button size="small" variant="contained" sx={{height:"45px"}} onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}>Ajouter au panier</Button>
                  </Box>
                  </Box>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      </Box >
    </div >
  );
};

export default Shop;
