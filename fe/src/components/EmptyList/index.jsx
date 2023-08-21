import {Typography} from "@mui/material";
import emptyBox from "../../assets/icons/emptyBox.svg";

import {Container} from "./styles";

const EmptyList = ({children}) => {
  return (
    <Container>
      <img src={emptyBox} alt="Empty Box" />
      <Typography color="#1c7b7b" variant="h4" marginTop="1rem">
        {children}
      </Typography>
    </Container>
  );
};

export default EmptyList;
