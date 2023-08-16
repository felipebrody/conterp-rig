import {Box} from "@mui/material";
import {styled} from "@mui/material/styles";

export const SelectContainer = styled(Box)(({isNonMobile}) => ({
  width: "100%",
  display: "flex",
  marginBottom: "1rem",
  justifyContent: isNonMobile ? "flex-end" : "space-between",
  gap: "1rem",
  alignItems: "center",
}));
