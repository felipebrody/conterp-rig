import {Box} from "@mui/material";
import {styled} from "@mui/material/styles";

export const GridFiller = styled(Box)({
  gridColumn: "span 1",
  gridRow: "span 3",
  //border: "1px solid red",
});

export const GridContainer = styled(Box)(({isNonMobile}) => ({
  display: "grid",
  gap: "15px",
  gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
  gridAutoRows: "120px",

  "& div": {
    gridColumn: isNonMobile ? undefined : "span 12",
  },
}));

export const StatBoxContainer = styled(Box)(({theme}) => ({
  gridColumn: "span 3",
  gridRow: "span 1",
  backgroundColor: theme.palette.grey[400],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "8px 4px 18px rgba(0,0,0, 0.14)",
}));
