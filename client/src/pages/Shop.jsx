import axios from "axios"
import { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import {useNavigate} from "react-router-dom"


const Shop = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
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
        fontWeight="600"
        textAlign="center"
        marginBottom="70px"
      >
        Nos Produits
      </Typography>
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
            sm:"9rem",
            xs:"1rem"
        }}}
      >
        <div style={{ flex: "1" }} className="mb-10">
          <div className="border border-solid bg-gray-200 p-3">
            <Typography fontWeight="600">Toutes Les Catégories</Typography>
            <div className="flex items-center justify-content-center">
              <FormControl variant="standard" sx={{
                m: 1, minWidth: {
                  sm: 250,
                  xs: 270,
                },
              }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Catégories
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Catégories"
                >
                  <MenuItem value="">
                    <em>Null</em>
                  </MenuItem>
                  <MenuItem value={10}>Tante</MenuItem>
                  <MenuItem value={20}>Tshirt</MenuItem>
                  <MenuItem value={30}>Utilities</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

        </div>
        {/* ITEMS */}
        <div
          className="flex flex-wrap gap-3"
          style={{ flex: 7 }}
        >
          {items.map((item) => (
            <div key={item._id}>
              <Card sx={{ maxWidth: 300 }} raised>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.img}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                  <Box display="flex" justifyContent="center" alignItems="center" marginTop="10px">
                    {Array(item.rating).fill(<StarIcon sx={{ color: "gold" }} />)}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small">{item.price}</Button>
                  <Button size="small" onClick={()=>{navigate(`${item._id}`)}}>Voir plus</Button>
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
