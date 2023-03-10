import { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Container, Typography, Box, Button, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../state";
import Loading from "../Components/Loading";

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8800/api/items/${id}`);
      setData(res.data);
    };
    fetchData();
  }, [id]);

  return (
    <Container sx={{ marginTop: "90px" }}>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <div className="mb-20 mt-10 flex gap-9">
          <Suspense fallback={<Loading />}>
            <div className="h-96 w-96">
              <Carousel autoPlay={true}>
                <div>
                  <img src={data.img} alt="" />
                </div>
                <div>
                  <img src={data.img2} alt="" />
                </div>
                <div>
                  <img src={data.img3} alt="" />
                </div>
              </Carousel>
            </div>
            <div className="flex flex-col gap-2">
              <Typography variant="h4" color="initial">
                {data.title}
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="start">
                {Array(data.rating).fill(<StarIcon sx={{ color: "gold" }} />)}{" "}
                <Typography variant="h6" fontSize="16px">
                  (10 reviews)
                </Typography>
              </Box>
              <Box
                bgcolor="#FFEA28"
                padding="0.35rem"
                maxWidth="fit-content"
                borderRadius="7px"
              >
                <Typography
                  variant="h4"
                  fontSize="18px"
                  sx={{ fontWeight: 500, color: "#343434" }}
                >
                  {data.price} DZD
                </Typography>
              </Box>
              <Typography variant="body1">{data.desc}</Typography>
              <Box display="flex" gap="20px" marginTop="20px">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="start"
                  sx={{ border: 1, borderColor: "#343434" }}
                >
                  <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography color="black">{count}</Typography>
                  <IconButton onClick={() => setCount(count + 1)}>
                    <AddIcon />
                  </IconButton>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                      dispatch(addToCart({ item: { ...data, count } }));
                    }}
                  >
                    Ajouter au panier
                  </Button>
                </Box>
              </Box>
            </div>
            <div></div>
          </Suspense>
        </div>
      </Container>
    </Container>
  );
};

export default Product;
