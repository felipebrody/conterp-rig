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

export const GridContainer = styled(Box)(({isNonMobile}) => ({
  display: "grid",
  gap: "15px",
  gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
  gridAutoRows: "100px",

  "& div": {
    gridColumn: isNonMobile ? undefined : "span 12",
  },
}));

export const StatBoxContainer = styled(Box)(({theme}) => ({
  gridColumn: "span 6",
  borderRadius: ".25rem",
  gridRow: "span 1",
  backgroundColor: theme.palette.grey[400],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
