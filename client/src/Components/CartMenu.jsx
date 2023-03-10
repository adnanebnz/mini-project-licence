import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../state";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);
  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(550px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h2" fontSize="22px">
              Votre Panier ({cart.length})
            </Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {cart.map((item) => (
              <Box key={`${item._id}-${item._id}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={item?.title}
                      width="123px"
                      height="164px"
                      src={item.img}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold" fontSize="16px">
                        {item.title}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ _id: item._id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography fontSize="14px">
                      {item.desc.substring(0, 50)}...
                    </Typography>
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid black`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ _id: item._id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ _id: item._id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography fontWeight="bold">
                        {item.price} DZD
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">Total</Typography>
              <Typography fontWeight="bold">{totalPrice} DZD</Typography>
            </FlexBox>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button
                sx={{
                  backgroundColor: "#2d55ff",
                  "&:hover": {
                    backgroundColor: "#0077b6",
                  },
                  color: "white",
                  borderRadius: 0,
                  minWidth: "80%",
                  padding: "15px 30px",
                  m: "20px 0",
                  fontSize: "16px",
                }}
                onClick={() => {
                  navigate("/checkout");
                  dispatch(setIsCartOpen({}));
                }}
              >
                Payer
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
