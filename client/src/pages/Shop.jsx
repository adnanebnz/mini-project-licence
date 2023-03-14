import axios from "axios";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../state";
const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/items");
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
        NOS PRODUITS
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

      {/* ITEMS */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1,1fr)",
            sm: "repeat(4,1fr)",
          },
          rowGap: "20px",
          columnGap: "20px",
          padding: "5px 50px",
        }}
      >
        {items.map((item) => (
          <Card
            key={item._id}
            sx={{ maxWidth: "300px", cursor: "pointer" }}
            elevation="8"
          >
            <CardMedia
              onClick={() => navigate(`${item._id}`)}
              component="img"
              height="140"
              sx={{ maxHeight: "200px" }}
              image={item.img}
            />
            <CardContent className="text-center">
              <Typography fontWeight="600" fontSize="15px" className="mb-2">
                {item.title}
              </Typography>
            </CardContent>
            <CardActions
              divider
              className="flex items-center justify-between py-3"
            >
              <Box
                sx={{
                  border: " 1px solid #005A92",
                  padding: "4px",
                  borderRadius: "5px",
                }}
                className="text-black"
              >
                <Typography
                  fontWeight={600}
                  sx={{
                    fontFamily:
                      "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
                  }}
                >
                  {item.price} د.ج
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0066B2",
                  fontWeight: "700",
                  fontSize: "12px",
                }}
                onClick={() => {
                  dispatch(addToCart({ item: { ...item, count } }));
                }}
              >
                Ajouter au panier
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default Shop;
