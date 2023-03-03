import { useSelector } from "react-redux";
import { Box, Button, Table, TableCell, TableContainer, TableHead, TableRow, Typography,Paper,TableBody, Container} from "@mui/material";
import axios from "axios"


const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
console.log(cart)
const totalPrice = cart.reduce((total, item) => {
  return total + item.count * item.price;
}, 0);
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
    <Container>
    <Box>
            <Box display="flex" marginTop="100px" sx={{flexDirection:{xs:"column",sm:"row"}}}>
              <Box display="flex" sx={{flex:7}} className="shadow-2xl">
            <TableContainer>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell  sx={{fontWeight:"bold"}}>Produit</TableCell>
            <TableCell align="right" sx={{fontWeight:"bold"}}>Prix</TableCell>
            <TableCell align="right"  sx={{fontWeight:"bold"}}>Quantité</TableCell>
            {/* <TableCell align="right"  sx={{fontWeight:"bold"}}>Total</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          
            {cart.map((item) => (
          <TableRow key={`${item._id}-${item._id}`} >
            
              <TableCell component="th" scope="row">
                <Box display="flex" gap="0.7rem" alignItems="center" sx={{flexDirection:{xs:"column",sm:"row"}}}>
                <img src={item.img} alt="" className="h-32 object-fill"/>
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
      </Table>
    </TableContainer>
    </Box>
    <Box sx={{flex:1,padding:"40px",display:"flex",alignItems:"center",justifyContent:"center"}}
    className="sticky">
    <TableContainer className="shadow-lg bg-gray-100">
      <Table sx={{ minwidth:"40%" }}>
        <TableHead>
          <TableRow>
            <TableCell  sx={{fontWeight:"bold",textAlign:"center"}}>Prix Total</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography className="text-center">{totalPrice}</Typography>
                </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>  
          </Box>
          <Box display="flex" alignItems="end" sx={{justifyContent:{
            xs:"center",
            sm:"end"
          }}} padding="30px">
          <Button variant="contained" onClick={makePayment}>PAYER</Button>
          </Box>
        </Box>
        </Container>
  );
};


export default Checkout;