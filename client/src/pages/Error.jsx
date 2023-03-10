import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen p-8">
      <Typography variant="h1" color="black" sx={{ textAlign: "center" }}>
        404
      </Typography>
      <Typography variant="h3" color="black" sx={{ textAlign: "center" }}>
        Page non trouvée
      </Typography>
      <div className="flex items-center justify-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="px-3 py-5 flex justify-center items-center border border-solid bg-blue-700 rounded-md text-white "
        >
          RETOURNER VERS L'ACCEUIL
        </button>
      </div>
    </div>
  );
};

export default Error;
