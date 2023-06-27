import { Spinner } from "../Spinner";
import { Box } from "@mui/material";

const Loader = ({ size }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="90%"
      width="100%"
    >
      <Spinner size={size} />
    </Box>
  );
};

export default Loader;
