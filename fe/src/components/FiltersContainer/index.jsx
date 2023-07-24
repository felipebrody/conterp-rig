import { useAuth } from "../../hooks/useAuth";

import { SelectBox, SelectContainer, StyledInputBase } from "./styles";

import ReactDatePickerComponents from "../ReactDatePickerComponents";

import {
  Box,
  useMediaQuery,
  useTheme,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
const FiltersContainer = ({
  startDate,
  setStartDate,
  setEndDate,
  endDate,
  currentDate,
  handleRigChange,
  selectedRig,
  rigs,
  isUserAdm,
}) => {
  const theme = useTheme();

  const isNonMobile = useMediaQuery("(min-width:800px)");

  return (
    <SelectContainer isNonMobile={isNonMobile}>
      {isUserAdm && (
        <SelectBox isNonMobile={isNonMobile}>
          <InputLabel id="month" sx={{ color: "#000" }}>
            SPT:
          </InputLabel>
          <Select
            labelId="month"
            label=" SPT:"
            input={<StyledInputBase />}
            onChange={(event) => handleRigChange(event)}
            value={selectedRig}
            size="small"
            sx={{
              margin: "auto 0",
              borderRadius: "1rem",
              outline: "none",
              backgroundColor: theme.palette.primary[500],
              width: "50%",
            }}
          >
            {rigs.map(({ id, name }) => (
              <MenuItem value={name} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </SelectBox>
      )}
      <ReactDatePickerComponents
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        currentDate={currentDate}
      />
    </SelectContainer>
  );
};

export default FiltersContainer;
