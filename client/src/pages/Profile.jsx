import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import noavatar from "../assets/noavatar.png";
const Profile = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/${id}`, {
          withCredentials: true,
        });
        setData(res.data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    fetchData();
  }, [id]);
  console.log(data)
  return (
    <Box marginTop="70px" marginBottom="50px">
      {error && (
        <Box height="100vh">
          <Typography variant="h3" sx={{ color: "red" }} textAlign="center">
            {error}
          </Typography>
        </Box>
      )}
      {!error && (
        <Box
          display="flex"
          flexDirection="column"
          gap="10px"
          alignItems="center"
          justifyContent="center"
        >
          {data.img!=="http://localhost:8800/Images/undefined" && (
          <img
            src={data.img}
            alt=""
            height="100px"
            width="100px"
            className="rounded-full object-contain"
          />
          )}
          {data.img === "http://localhost:8800/Images/undefined" && (
            <img
            src={noavatar}
            alt=""
            height="100px"
            width="100px"
            className="rounded-full object-contain"
          />
          )}

          <Typography>Nom : {data.lastName}</Typography>
          <Typography>Prénom : {data.firstName}</Typography>
          <Typography>Email : {data.email}</Typography>
          <Typography>Username : {data.username}</Typography>
          <Typography>Age : {data.age} Ans</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
