import Switch from "@mui/material/Switch";
import { Box, InputBase, FormControl } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.primary[600],
    "&:hover": {
      backgroundColor: theme.palette.primary[700],
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.primary[200],
  },
}));

export const DatePickerContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gridColumn: "span 12",
});

export const TimerPickerContainer = styled(Box)(({ isNonMobile }) => ({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  gap: "1.5rem",

  gridColumn: isNonMobile ? "span 6" : "span 12",
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
