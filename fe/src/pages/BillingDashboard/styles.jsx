import Switch from "@mui/material/Switch";
import { Box, InputBase, FormControl } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const SelectContainer = styled(Box)(({ isNonMobile }) => ({
  width: "100%",
  display: "flex",
  marginBottom: "1rem",
  justifyContent: isNonMobile ? "flex-end" : "space-between",
  gap: "1rem",
  alignItems: "center",
}));

export const SelectBox = styled(Box)(({ isNonMobile }) => ({
  display: "flex",
  justifyContent: isNonMobile ? "flex-end" : "center",
  gap: "1rem",
  alignItems: "center",
  width: isNonMobile ? "25%" : "50%",
}));

export const GridContainer = styled(Box)(({ isNonMobile }) => ({
  display: "grid",
  gap: "15px",
  gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
  gridAutoRows: "100px",

  "& div": {
    gridColumn: isNonMobile ? undefined : "span 12",
  },
}));

export const StatBoxContainer = styled(Box)(({ theme }) => ({
  gridColumn: "span 6",
  borderRadius: ".25rem",
  gridRow: "span 1",
  backgroundColor: theme.palette.grey[400],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const GlossHoursContainer = styled(Box)(({ isNonMobile }) => ({
  border: isNonMobile ? "6px solid #fff" : "2px solid #fff",
  padding: "1rem",
  gridColumn: "span 4",
}));

export const GlossDetailContainer = styled(Box)(({ isNonMobile }) => ({
  display: isNonMobile ? "flex" : undefined,
  alignItems: "center",
}));

export const GlossPeriodContainer = styled(Box)(({ isNonMobile }) => ({
  margin: "1rem",
  border: ".5px solid #fff",
  padding: "1rem",
  gridColumn: "span 4",
  display: isNonMobile ? undefined : "flex",
  flexDirection: isNonMobile ? undefined : "column",
}));

export const RepairHoursContainer = styled(Box)({
  border: ".5px solid #fff",
  padding: "1rem",
  gridColumn: "span 2",
});

export const DTMHoursContainer = styled(Box)({
  border: ".5px solid #fff",
  padding: "1rem",
  gridColumn: "span 2",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const RatioContainer = styled(Box)({
  border: ".5px solid #fff",
  padding: "1rem",
  gridColumn: "span 2",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const StyledInputBase = styled(InputBase)({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    "& label.Mui-focused": {
      color: "#fff",
      fontSize: "1.25rem",
    },
  },
  width: "100%",
});

export const StyledFormControl = styled(Box)(({ isNonMobile }) => ({
  width: "100%",
  gridColumn: isNonMobile ? "span 3" : "span 6",
}));

export const SwitchContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gridColumn: "span 3",
  border: ".25px solid rgb(255, 255, 255, .25)",
  borderRadius: "4px",
  padding: ".25rem",
});
