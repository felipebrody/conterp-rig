import { Box, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";

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
