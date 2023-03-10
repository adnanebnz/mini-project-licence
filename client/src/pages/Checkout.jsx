import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Container,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import axios from "axios";
import { Suspense, useState } from "react";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);
  const [choice, setChoice] = useState(null);
  const [error, setError] = useState(null);
  async function makePayment(e) {
    e.preventDefault();
    if (choice === "credit" && totalPrice > 0) {
      await axios
        .post(
          "http://localhost:8800/api/orders/create-checkout-session",
          {
            cart,
          },
          {
            headers: {
              Authorization: `Bearer pk_test_51MPSH6KX3Z9zsfWLmrhZ9jmab0SRFoMjP70K8pJe6aC05CXTvDuKsnCB2MVMR5UlNnLBA2TKuSnVNshFDJ6RTGMl00eMlZHhtE`,
            },
          }
        )
        .then((res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => console.log(err.message));
    } else if (choice === "livraison" && totalPrice > 0) {
      navigate("/checkout/process");
    } else {
      setError("Error occured!");
    }
  }

  return (
    <Container>
      <Box sx={{ marginBottom: "40px" }}>
        <Box
          display="flex"
          marginTop="100px"
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
        >
          <Box display="flex" sx={{ flex: 7 }} className="shadow-lg">
            <TableContainer>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Produit</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Prix
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Quantité
                    </TableCell>
                    {/* <TableCell align="right"  sx={{fontWeight:"bold"}}>Total</TableCell> */}
                  </TableRow>
                </TableHead>
                <Suspense fallback={<Loading />}>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={`${item._id}-${item._id}`}>
                        <TableCell component="th" scope="row">
                          <Box
                            display="flex"
                            gap="0.7rem"
                            alignItems="center"
                            sx={{ flexDirection: { xs: "column", sm: "row" } }}
                          >
                            <img
                              src={item.img}
                              alt=""
                              className="h-32 object-fill"
                            />
                            <Typography>{item.title}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">{item.price}</TableCell>
                        <TableCell align="center">{item.count}</TableCell>
                        {/* TO ADD REDUCERS */}
                        {/* <TableCell align="center">{item.price}</TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Suspense>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              flex: 1,
              padding: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="sticky"
          >
            <TableContainer className="shadow-lg bg-gray-100">
              <Table sx={{ minwidth: "40%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                      Prix Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <Suspense fallback={<Loading />}>
                      <TableCell component="th" scope="row">
                        <Typography className="text-center">
                          {totalPrice}
                        </Typography>
                      </TableCell>
                    </Suspense>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        <Box sx={{ marginTop: "50px" }}>
          <Typography variant="h3" fontSize="22px">
            Selectionnez le mode de paiement:
          </Typography>

          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="livraison"
                control={<Radio />}
                label="Paiement a la livraison"
                onClick={() => setChoice("livraison")}
                defaultChecked={true}
              />
              <FormControlLabel
                value="credit"
                control={<Radio />}
                label="Payez avec votre carte de débit"
                onClick={() => setChoice("credit")}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          display="flex"
          alignItems="end"
          sx={{
            justifyContent: {
              xs: "center",
              sm: "end",
            },
            marginTop: "10px",
          }}
        >
          <Button variant="contained" size="large" onClick={makePayment}>
            PASSER LA COMMANDE
          </Button>
        </Box>
      </Box>
      {error && (
        <Typography sx={{ color: "red", textAlign: "center" }}>
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default Checkout;
