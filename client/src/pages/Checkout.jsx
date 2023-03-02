import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { useState } from "react";
import axios from "axios"


const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);

  async function makePayment() {
    
    await axios.post("http://localhost:8800/api/stripe/create-checkout-session", {
      cart
    },{headers:{Authorization:`Bearer pk_test_51MPSH6KX3Z9zsfWLmrhZ9jmab0SRFoMjP70K8pJe6aC05CXTvDuKsnCB2MVMR5UlNnLBA2TKuSnVNshFDJ6RTGMl00eMlZHhtE`}}).then((res)=>{
      if(res.data.url){
        window.location.href=res.data.url;
      }
    }).catch((err)=>console.log(err.message))
  }

  return (
    <Box width="80%" m="100px auto" display="flex" justifyContent="center">
      
          <Button variant="contained" onClick={makePayment}>PAYER</Button>
        </Box>
  );
};


export default Checkout;