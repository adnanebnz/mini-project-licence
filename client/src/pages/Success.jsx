import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import { useNavigate } from "react-router-dom";
const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-300 flex items-center justify-center h-screen gap-4">
      <Box
        sx={{
          margin: "5rem ",
          padding: "2rem",
          backgroundColor: "white",
          width: 500,
          height: 500,
        }}
        className="w-1/2 h-1/2 flex flex-col gap-2 items-center justify-center shadow-lg hover:shadow-2xl"
      >
        <CheckCircleSharpIcon sx={{ fontSize: "52px", color: "green" }} />
        <Typography
          variant="h3"
          sx={{ alignContent: "center", fontWeight: "bold" }}
          className="text-lime-500 text-center"
        >
          SUCCESS
        </Typography>
        <Typography variant="h4" className="text-center">
          votre opération de paiement est valider
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Page d'acceuil
        </Button>
      </Box>
    </div>
  );
};

export default Success;
