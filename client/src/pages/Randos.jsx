import axios from "axios";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Typography,
  Card,
  Container,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  CardActionArea,
  Stack,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../state";

const Randos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/pins`);
        setItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mt-11 mb-10">
      <Typography
        variant="h1"
        fontSize="26px"
        fontWeight="400"
        textAlign="center"
      >
        RANDONEES DISPONIBLES
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ marginBottom: "50px", marginTop: "40px" }}
      >
        <Stack direction="row" spacing={1}>
          <Chip label="Tables" variant="outlined" />
          <Chip label="Chaises" variant="outlined" />
          <Chip label="Tantes" variant="outlined" />
          <Chip label="Vetements" variant="outlined" />
          <Chip label="Boots" variant="outlined" />
        </Stack>
      </Box>
      <Container maxWidth="lg">
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(3, 1fr)",
        }}
        gap="1rem"
        padding="0px 15px"
      >
        {/* ITEMS */}
        
          {items.map((item) => (
            <div key={item._id}>
              <Card sx={{ maxWidth: "300px", cursor: "pointer" }} raised>
                <CardActionArea onClick={() => navigate(`${item._id}`)}>
                  <CardMedia
                    component="img"
                    height="140"
                    sx={{ maxHeight: "200px" }}
                    image={item.img}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      fonSize="18px"
                      variant="h6"
                      component="div"
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc.substring(0, 80)}...
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      marginTop="10px"
                      gap="0.5rem"
                    >
                      <Box
                        bgcolor="#FFEA28"
                        padding="0.35rem"
                        borderRadius="7px"
                      >
                        <Typography
                          variant="h4"
                          fontSize="18px"
                          sx={{ fontWeight: 500, color: "#343434" }}
                        >
                          {item.price} د.ج
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap="20px"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ border: 1, borderColor: "#343434" }}
                    >
                      <IconButton
                        onClick={() => setCount(Math.max(count - 1, 1))}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography color="black">{count}</Typography>
                      <IconButton onClick={() => setCount(count + 1)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Box>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ height: "45px" }}
                        onClick={() => {
                          dispatch(addToCart({ item: { ...item, count } }));
                        }}
                      >
                        Ajouter au panier
                      </Button>
                    </Box>
                  </Box>
                </CardActions>
              </Card>
            </div>
          ))}
        </Box>
        </Container>
    </div>
  );
};

export default Randos;
