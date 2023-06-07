import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { FieldArray, Formik } from "formik";

import { v4 as uuidv4 } from "uuid";

import * as yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  DatePickerContainer,
  TimerPickerContainer,
  GlossHoursContainer,
  StyledInputBase,
  StyledSwitch,
  StyledFormControl,
  SwitchContainer,
  DTMHoursContainer,
  RatioContainer,
  GlossPeriodContainer,
  GlossDetailContainer,
} from "./styles";
import "dayjs/locale/pt-br";

import toast from "../../utils/toast";
import {
  glossClassification,
  repairClassification,
  distanceClassification,
  periodType,
} from "../../utils/glossClassifications";

import OilWellsServices from "../../services/OilWellsServices";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { StyledTextField } from "../StyledTextField";
import EfficienciesServices from "../../services/EfficienciesServices";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import EfficiencyMapper from "../../services/mappers/EfficiencyMapper";

const EfficiencyForm = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const theme = useTheme();

  //Estado da data
  const [date, setDate] = useState("");
  //Estados das operações
  const [periods, setPeriods] = useState([
    {
      id: uuidv4(),
      startHour: "",
      endHour: "",
      type: "",
      oilWell: "",
      glossClassification: "",
      repairClassification: "",
      description: "",
      DTMDistance: "",
      equipmentRatio: "",
      fluidRatio: "",
    },
  ]);

  const [hasRepairHours, setHasRepairHours] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oilWells, setOilWells] = useState([]);
  const [isLoadingOilWells, setIsLoadingOilWells] = useState(false);

  useEffect(() => {
    console.log("renderizou");
  }, []);

  useEffect(() => {
    const loadRigs = async () => {
      setIsLoadingOilWells(true);
      try {
        const response = await OilWellsServices.listOilWells();
        setOilWells(response);
        console.log("rigs ===>", oilWells);
      } catch (error) {
        toast({
          type: "error",
          text: "Erro ao carregar os Poços!",
        });
        console.log(error);
      } finally {
        setIsLoadingOilWells(false);
      }
    };
    loadRigs();
  }, [setOilWells]);

  const isNonMobile = useMediaQuery("(min-width:800px)");

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(periods, date);

    const result = EfficiencyMapper.toDomain(periods, date, user);

    console.log("Resultado do Método toDomain ===>", result);

    setIsLoading(true);

    try {
      const efficiency = await EfficienciesServices.createEfficiency(result);

      toast({
        type: "default",
        text: "Dados Enviados com Sucesso!",
      });

      navigate(`/user/home`);
    } catch (error) {
      console.log("caiu dentro do try/catch ### error");

      toast({
        type: "error",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (value) => {
    setDate(value);
  };

  const handleStartHourChange = (id, value) => {
    const newPeriods = periods.map((period) => {
      return period.id === id ? { ...period, startHour: value } : period;
    });

    setPeriods(newPeriods);
  };

  const handleEndHourChange = (id, value) => {
    const newPeriods = periods.map((period) => {
      return period.id === id ? { ...period, endHour: value } : period;
    });

    setPeriods(newPeriods);
  };

  const handleTypeChange = (id, event) => {
    console.log("value", event);
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? { ...period, type: event.target.value }
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleOilWellChange = (id, event) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? { ...period, oilWell: event.target.value }
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleChangeDescription = (id, event) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? { ...period, description: event.target.value }
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleGlossClassificationChange = (id, event) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? { ...period, glossClassification: event.target.value }
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleDTMDistanceChange = (id, event) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? { ...period, DTMDistance: event.target.value }
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleRepairClassificationChange = (id, event) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? { ...period, repairClassification: event.target.value }
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleEquipmentRatioChange = (id, event) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? { ...period, equipmentRatio: event.target.value }
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleFluidRatioChange = (id, event) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? { ...period, fluidRatio: event.target.value }
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleDeletePeriod = (id) => {
    const newPeriods = periods.filter((period) => period.id !== id);

    setPeriods(newPeriods);
  };

  const addPeriod = () => {
    setPeriods([
      ...periods,
      {
        id: uuidv4(),
        startHour: "",
        endHour: "",
        type: "",
        oilWell: "",
        glossClassification: "",
        repairClassification: "",
        description: "",
        DTMDistance: "",
        equipmentRatio: "",
        fluidRatio: "",
      },
    ]);
  };

  return (
    <Box
      m={isNonMobile ? "1rem" : "0"}
      backgroundColor={theme.palette.primary[500]}
      padding={isNonMobile ? "2rem" : ".5rem"}
      maxWidth="1000px"
      minWidth={isNonMobile ? "800px" : undefined}
      width={isNonMobile ? "60%" : "100%"}
      height="100%"
      borderRadius={isNonMobile ? "1rem" : "0"}
    >
      <Box display="flex" justifyContent="center" marginBottom="1rem">
        <h1>Boletim Diário de Ocorrência</h1>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(12, minmax(0, 1fr))"
          sx={
            {
              // "& div": { gridColumn: isNonMobile ? undefined : "span 12" },
            }
          }
        >
          <DatePickerContainer>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="pt-br"
            >
              <DatePicker
                sx={{ width: "50%" }}
                disableFuture
                label="Data"
                name="date"
                value={date}
                onChange={(value) => handleDateChange(value)}
              />
            </LocalizationProvider>
          </DatePickerContainer>
          {periods.map((period, index) => (
            <React.Fragment key={period.id}>
              <Box border="1px solid #fff" sx={{ gridColumn: "span 12" }}></Box>
              <TimerPickerContainer isNonMobile={isNonMobile}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Início"
                    ampm={false}
                    minutesStep={1}
                    onChange={(value) =>
                      handleStartHourChange(period.id, value)
                    }
                    value={period.startHour}
                  />

                  <TimePicker
                    label="Fim"
                    ampm={false}
                    minutesStep={1}
                    onChange={(value) => handleEndHourChange(period.id, value)}
                    value={period.endHour}
                  />
                </LocalizationProvider>
              </TimerPickerContainer>

              <StyledFormControl isNonMobile={isNonMobile}>
                <InputLabel id="type">Tipo</InputLabel>
                <Select
                  labelId="type"
                  label="Tipo"
                  input={<StyledInputBase />}
                  onChange={(event) => handleTypeChange(period.id, event)}
                  value={period.type}
                  size="small"
                  sx={{
                    margin: "auto 0",
                    borderRadius: "1rem",
                    outline: "none",
                    backgroundColor: theme.palette.primary[500],
                  }}
                >
                  {periodType.map((category) => (
                    <MenuItem value={category.value} key={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>

              {period.type === "repair" && (
                <StyledFormControl isNonMobile={isNonMobile}>
                  <InputLabel id="repair-classification">
                    Classificação
                  </InputLabel>
                  <Select
                    labelId="repair-classification"
                    label="Classificação"
                    input={<StyledInputBase />}
                    onChange={(event) =>
                      handleRepairClassificationChange(period.id, event)
                    }
                    value={period.repairClassification}
                    size="small"
                    sx={{
                      margin: "auto 0",
                      borderRadius: "1rem",
                      outline: "none",
                      backgroundColor: theme.palette.primary[500],
                    }}
                  >
                    {repairClassification.map((classification) => (
                      <MenuItem
                        value={classification.value}
                        key={classification.id}
                      >
                        {classification.name}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledFormControl>
              )}

              {period.type === "dtm" && (
                <StyledFormControl isNonMobile={isNonMobile}>
                  <InputLabel id="dtm-distance">Distância DTM</InputLabel>
                  <Select
                    labelId="dtm-distance"
                    label="Distância DTM"
                    input={<StyledInputBase />}
                    onChange={(event) =>
                      handleDTMDistanceChange(period.id, event)
                    }
                    value={period.DTMDistance}
                    size="small"
                    sx={{
                      margin: "auto 0",
                      borderRadius: "1rem",
                      outline: "none",
                      backgroundColor: theme.palette.primary[500],
                    }}
                  >
                    {distanceClassification.map((classification) => (
                      <MenuItem
                        value={classification.value}
                        key={classification.id}
                      >
                        {classification.name}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledFormControl>
              )}

              {period.type === "gloss" && (
                <StyledFormControl isNonMobile={isNonMobile}>
                  <InputLabel id="gloss-classification">
                    Classificação Glosa
                  </InputLabel>
                  <Select
                    labelId="gloss-classification"
                    label="Classificação Glosa"
                    input={<StyledInputBase />}
                    onChange={(event) =>
                      handleGlossClassificationChange(period.id, event)
                    }
                    value={period.glossClassification}
                    size="small"
                    sx={{
                      margin: "auto 0",
                      borderRadius: "1rem",
                      outline: "none",
                      backgroundColor: theme.palette.primary[500],
                    }}
                  >
                    {glossClassification.map((classification) => (
                      <MenuItem
                        value={classification.value}
                        key={classification.id}
                      >
                        {classification.name}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledFormControl>
              )}

              <Box
                display="flex"
                alignItems="flex-end"
                sx={{ gridColumn: "span 9" }}
              >
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  label="Descrição"
                  onChange={(event) =>
                    handleChangeDescription(period.id, event)
                  }
                  multiline
                  rows={1}
                  value={period.description}
                />
              </Box>

              <StyledFormControl isNonMobile={isNonMobile}>
                <InputLabel id="oil-well-label">Poço</InputLabel>
                <Select
                  labelId="oil-well-label"
                  label="Taxa Equipamento"
                  input={<StyledInputBase />}
                  onChange={(event) => handleOilWellChange(period.id, event)}
                  value={period.oilWell}
                  size="small"
                  sx={{
                    margin: "auto 0",
                    borderRadius: "1rem",
                    outline: "none",
                    backgroundColor: theme.palette.primary[500],
                  }}
                >
                  {oilWells.map((oilWell) => (
                    <MenuItem value={oilWell.id} key={oilWell.id}>
                      {oilWell.name}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>

              <StyledFormControl
                isNonMobile={isNonMobile}
                sx={{ gridColumn: "span 6" }}
              >
                <InputLabel id="equipment-ratio">
                  Movimentação de Equipamento
                </InputLabel>
                <Select
                  labelId="equipment-ratio"
                  label="Movimentação de Equipamento"
                  input={<StyledInputBase />}
                  onChange={(event) =>
                    handleEquipmentRatioChange(period.id, event)
                  }
                  value={period.equipmentRatio}
                  size="small"
                  sx={{
                    margin: "auto 0",
                    borderRadius: "1rem",
                    outline: "none",
                    backgroundColor: theme.palette.primary[500],
                  }}
                >
                  {distanceClassification.map((classification) => (
                    <MenuItem
                      value={classification.value}
                      key={classification.id}
                    >
                      {classification.name}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>

              <StyledFormControl
                isNonMobile={isNonMobile}
                sx={{ gridColumn: "span 6" }}
              >
                <InputLabel id="fluid-ratio">Movimentação de Flúido</InputLabel>
                <Select
                  labelId="fluid-ratio"
                  label="Taxa Flúido"
                  input={<StyledInputBase />}
                  onChange={(event) => handleFluidRatioChange(period.id, event)}
                  value={period.fluidRatio}
                  size="small"
                  sx={{
                    margin: "auto 0",
                    borderRadius: "1rem",
                    outline: "none",
                    backgroundColor: theme.palette.primary[500],
                  }}
                >
                  {distanceClassification.map((classification) => (
                    <MenuItem
                      value={classification.value}
                      key={classification.id}
                    >
                      {classification.name}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>

              {periods.length > 1 && (
                <Box
                  sx={{ gridColumn: "span 12" }}
                  display="flex"
                  justifyContent="end"
                  mt=".5rem"
                  width="100%"
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeletePeriod(period.id)}
                    startIcon={<RemoveIcon />}
                  >
                    Remover Período
                  </Button>
                </Box>
              )}
              <Box border="1px solid #fff" sx={{ gridColumn: "span 12" }}></Box>
            </React.Fragment>
          ))}
        </Box>

        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ mt: "1rem" }}
          color="secondary"
          onClick={addPeriod}
        >
          Adicionar Período
        </Button>

        <Box display="flex" justifyContent="center" mt="1.5rem" width="100%">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            size="large"
            sx={{ width: "50%" }}
            disabled={isLoading}
          >
            Enviar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EfficiencyForm;
