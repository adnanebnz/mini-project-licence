import { Box, CircularProgress } from "@mui/material";
const Loading = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", height: "100vh" }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
