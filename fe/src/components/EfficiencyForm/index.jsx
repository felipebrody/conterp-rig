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
import { useEffect, useState } from "react";
import { FieldArray, Formik } from "formik";
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
} from "../../utils/glossClassifications";

import OilWellsServices from "../../services/OilWellsServices";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { StyledTextField } from "../StyledTextField";
import EfficienciesServices from "../../services/EfficienciesServices";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import EfficiencyMapper from "../../services/mappers/EfficiencyMapper";

const efficiencySchema = yup.object().shape({
  date: yup.date().nullable().required("Obrigatório"),
  gloss_periods: yup
    .array()
    .ensure()
    .of(
      yup.object().shape({
        start_time_gloss: yup.string().nullable(),
        end_time_gloss: yup.string().nullable(),
        gloss_classification: yup.string().nullable(),
        gloss_description: yup.string().nullable(),
      })
    ),
  repair_periods: yup
    .array()
    .ensure()
    .of(
      yup.object().shape({
        start_time_repair: yup.string().nullable(),
        end_time_repair: yup.string().nullable(),
        repair_classification: yup.string().nullable(),
        repair_description: yup.string().nullable(),
      })
    ),
  equipment_ratio: yup.string().nullable(),
  fluid_ratio: yup.string().nullable(),
  dtm_distance: yup.string().nullable(),
  available_hours: yup.number().required("Obrigatório"),
  dtm_hours: yup.number(),
  oil_well: yup.string().nullable(),
});

const EfficiencyForm = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const theme = useTheme();

  const [hasGlossHours, setHasGlossHours] = useState(false);
  const [hasRepairHours, setHasRepairHours] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oilWells, setOilWells] = useState([]);
  const [isLoadingOilWells, setIsLoadingOilWells] = useState(false);

  const initialValues = {
    date: "",
    gloss_periods: [
      {
        start_time_gloss: "",
        end_time_gloss: "",
        gloss_classification: "",
        gloss_description: "",
      },
    ],
    repair_periods: [
      {
        start_time_repair: "",
        end_time_repair: "",
        repair_classification: "",
        repair_description: "",
      },
    ],
    equipment_ratio: "",
    fluid_ratio: "",
    dtm_distance: "",
    available_hours: "",
    dtm_hours: "",
    oil_well: "",
  };

  useEffect(() => {
    const loadRigs = async () => {
      setIsLoadingOilWells(true);
      try {
        const response = await OilWellsServices.listOilWells();
        setOilWells(response);
      } catch (error) {
        toast({
          type: "error",
          text: "Erro ao carregar os Poços!",
        });
      } finally {
        setIsLoadingOilWells(false);
      }
    };
    loadRigs();
  }, [setOilWells]);

  const isNonMobile = useMediaQuery("(min-width:800px)");

  const handleFormSubmit = async (values, onSubmitProps) => {
    const {
      date,
      gloss_periods,
      repair_periods,
      equipment_ratio,
      fluid_ratio,
      dtm_distance,
      available_hours,
      dtm_hours,
      has_repair_hours,
      has_gloss_hours,
      oil_well,
    } = EfficiencyMapper.toDomain(values, hasRepairHours, hasGlossHours);

    setIsLoading(true);

    try {
      const efficiency = await EfficienciesServices.createEfficiency({
        date,
        gloss_periods,
        repair_periods,
        equipment_ratio,
        fluid_ratio,
        dtm_distance,
        available_hours,
        dtm_hours,
        has_repair_hours,
        has_gloss_hours,
        rig_id: user.rig_id,
        user_id: user.id,
        oil_well,
      });

      onSubmitProps.resetForm();

      toast({
        type: "default",
        text: "Dados Enviados com Sucesso!",
      });

      navigate(`/user/home`);
    } catch (error) {
      toast({
        type: "error",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGlossHoursSwitchChange = (event) => {
    setHasGlossHours(event.target.checked);
  };

  const handleRepairHoursSwitchChange = (event) => {
    setHasRepairHours(event.target.checked);
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

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={efficiencySchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <DatePickerContainer>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <DatePicker
                    sx={{ width: "100%" }}
                    disableFuture
                    label="Data"
                    name="date"
                    value={values.date}
                    error={Boolean(touched.date) && Boolean(errors.date)}
                    helperText={touched.date && errors.date}
                    onChange={(date) => setFieldValue("date", date)}
                  />
                </LocalizationProvider>
              </DatePickerContainer>

              <StyledFormControl>
                <InputLabel id="oil-wellce-label">Poço</InputLabel>
                <Select
                  labelId="oil-well-label"
                  label="Taxa Equipamento"
                  input={<StyledInputBase />}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.oil_well}
                  name="oil_well"
                  size="small"
                  error={Boolean(touched.oil_well) && Boolean(errors.oil_well)}
                  sx={{
                    padding: ".5rem",
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

              <SwitchContainer>
                <Typography>Possui Glosa</Typography>

                <StyledSwitch
                  checked={hasGlossHours}
                  onChange={handleGlossHoursSwitchChange}
                  theme={theme}
                />
              </SwitchContainer>

              <SwitchContainer>
                <Typography>Possui Reparo</Typography>

                <StyledSwitch
                  checked={hasRepairHours}
                  onChange={handleRepairHoursSwitchChange}
                  theme={theme}
                />
              </SwitchContainer>

              {hasGlossHours && (
                <GlossHoursContainer isNonMobile={isNonMobile}>
                  <Typography align="center">Períodos Glosa</Typography>

                  <FieldArray name="gloss_periods">
                    {({ push, remove, form }) => (
                      <>
                        {form.values.gloss_periods.map((period, index) => (
                          <Box key={index}>
                            <GlossPeriodContainer isNonMobile={isNonMobile}>
                              <GlossDetailContainer isNonMobile={isNonMobile}>
                                <TimerPickerContainer>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <TimePicker
                                      label="Início"
                                      onBlur={form.handleBlur}
                                      onChange={(value) =>
                                        form.setFieldValue(
                                          `gloss_periods[${index}].start_time_gloss`,
                                          value
                                        )
                                      }
                                      value={period.start_time_gloss}
                                      name={`gloss_periods[${index}].start_time_gloss`}
                                    />
                                    <TimePicker
                                      label="Fim"
                                      name={`gloss_periods[${index}].end_time_gloss`}
                                      onBlur={form.handleBlur}
                                      onChange={(value) =>
                                        form.setFieldValue(
                                          `gloss_periods[${index}].end_time_gloss`,
                                          value
                                        )
                                      }
                                      value={period.end_time_gloss}
                                    />
                                  </LocalizationProvider>
                                </TimerPickerContainer>

                                <StyledFormControl>
                                  <InputLabel id="classification-label">
                                    Classificação
                                  </InputLabel>
                                  <Select
                                    labelId="classification-label"
                                    label="Classificação"
                                    input={<StyledInputBase />}
                                    onBlur={form.handleBlur}
                                    onChange={(event) =>
                                      form.setFieldValue(
                                        `gloss_periods[${index}].gloss_classification`,
                                        event.target.value
                                      )
                                    }
                                    value={period.gloss_classification}
                                    name={`gloss_periods[${index}].gloss_classification`}
                                    size="small"
                                    error={
                                      Boolean(touched.gloss_classification) &&
                                      Boolean(errors.gloss_classification)
                                    }
                                    sx={{
                                      padding: ".5rem",
                                      borderRadius: "1rem",
                                      outline: "none",
                                      backgroundColor:
                                        theme.palette.primary[500],
                                    }}
                                  >
                                    <MenuItem value="">Selecione</MenuItem>
                                    {glossClassification.map(
                                      (classification) => (
                                        <MenuItem
                                          value={classification.value}
                                          key={classification.id}
                                        >
                                          {classification.name}
                                        </MenuItem>
                                      )
                                    )}
                                  </Select>
                                </StyledFormControl>
                              </GlossDetailContainer>

                              <StyledTextField
                                fullWidth
                                variant="outlined"
                                name={`gloss_periods[${index}].gloss_description`}
                                label="Descrição"
                                onBlur={form.handleBlur}
                                onChange={(event) =>
                                  form.setFieldValue(
                                    `gloss_periods[${index}].gloss_description`,
                                    event.target.value
                                  )
                                }
                                multiline
                                rows={1}
                                value={period.gloss_description}
                              />

                              {index > 0 && (
                                <Box
                                  display="flex"
                                  justifyContent="end"
                                  mt=".5rem"
                                  width="100%"
                                >
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => remove(index)}
                                    startIcon={<RemoveIcon />}
                                  >
                                    Remover Período
                                  </Button>
                                </Box>
                              )}
                            </GlossPeriodContainer>
                          </Box>
                        ))}
                        <Button
                          startIcon={<AddIcon />}
                          variant="contained"
                          sx={{ mt: "1rem" }}
                          color="secondary"
                          onClick={() =>
                            push({
                              start_time_gloss: "",
                              end_time_gloss: "",
                              gloss_description: "",
                              gloss_classification: "",
                            })
                          }
                        >
                          Adicionar Período
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </GlossHoursContainer>
              )}

              {hasRepairHours && (
                <GlossHoursContainer isNonMobile={isNonMobile}>
                  <Typography align="center">Períodos Reparo</Typography>

                  <FieldArray name="repair_periods">
                    {({ push, remove, form }) => (
                      <>
                        {form.values.repair_periods.map((period, index) => (
                          <Box key={index}>
                            <GlossPeriodContainer isNonMobile={isNonMobile}>
                              <GlossDetailContainer isNonMobile={isNonMobile}>
                                <TimerPickerContainer>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <TimePicker
                                      label="Início"
                                      onBlur={form.handleBlur}
                                      onChange={(value) =>
                                        form.setFieldValue(
                                          `repair_periods[${index}].start_time_repair`,
                                          value
                                        )
                                      }
                                      value={period.start_time_repair}
                                      name={`repair_periods[${index}].start_time_repair`}
                                    />
                                    <TimePicker
                                      label="Fim"
                                      name={`repair_periods[${index}].end_time_repair`}
                                      onBlur={form.handleBlur}
                                      onChange={(value) =>
                                        form.setFieldValue(
                                          `repair_periods[${index}].end_time_repair`,
                                          value
                                        )
                                      }
                                      value={period.end_time_repair}
                                    />
                                  </LocalizationProvider>
                                </TimerPickerContainer>

                                <StyledFormControl>
                                  <InputLabel id="classification-label">
                                    Classificação
                                  </InputLabel>
                                  <Select
                                    labelId="classification-label"
                                    label="Classificação"
                                    input={<StyledInputBase />}
                                    onBlur={form.handleBlur}
                                    onChange={(event) =>
                                      form.setFieldValue(
                                        `repair_periods[${index}].repair_classification`,
                                        event.target.value
                                      )
                                    }
                                    value={period.repair_classification}
                                    name={`repair_periods[${index}].repair_classification`}
                                    size="small"
                                    error={
                                      Boolean(touched.repair_classification) &&
                                      Boolean(errors.repair_classification)
                                    }
                                    sx={{
                                      padding: ".5rem",
                                      borderRadius: "1rem",
                                      outline: "none",
                                      backgroundColor:
                                        theme.palette.primary[500],
                                    }}
                                  >
                                    <MenuItem value="">Selecione</MenuItem>
                                    {repairClassification.map(
                                      (classification) => (
                                        <MenuItem
                                          value={classification.value}
                                          key={classification.id}
                                        >
                                          {classification.name}
                                        </MenuItem>
                                      )
                                    )}
                                  </Select>
                                </StyledFormControl>
                              </GlossDetailContainer>

                              <StyledTextField
                                fullWidth
                                variant="outlined"
                                name={`repair_periods[${index}].repair_description`}
                                label="Descrição"
                                onBlur={form.handleBlur}
                                onChange={(event) =>
                                  form.setFieldValue(
                                    `repair_periods[${index}].repair_description`,
                                    event.target.value
                                  )
                                }
                                multiline
                                rows={1}
                                value={period.repair_description}
                              />

                              {index > 0 && (
                                <Box
                                  display="flex"
                                  justifyContent="end"
                                  mt=".5rem"
                                  width="100%"
                                >
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => remove(index)}
                                    startIcon={<RemoveIcon />}
                                  >
                                    Remover Período
                                  </Button>
                                </Box>
                              )}
                            </GlossPeriodContainer>
                          </Box>
                        ))}
                        <Button
                          startIcon={<AddIcon />}
                          variant="contained"
                          sx={{ mt: "1rem" }}
                          color="secondary"
                          onClick={() =>
                            push({
                              start_time_repair: "",
                              end_time_repair: "",
                              repair_description: "",
                              repair_classification: "",
                            })
                          }
                        >
                          Adicionar Período
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </GlossHoursContainer>
              )}

              <StyledTextField
                fullWidth
                name="available_hours"
                variant="outlined"
                type="number"
                label="Hora Disponível"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.available_hours}
                error={
                  Boolean(touched.available_hours) &&
                  Boolean(errors.available_hours)
                }
                helperText={touched.available_hours && errors.available_hours}
                sx={{ gridColumn: "span 4" }}
              />

              <DTMHoursContainer>
                <Typography align="center">Hora DTM</Typography>

                <StyledTextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  name="dtm_hours"
                  label="Hora DTM"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dtm_hours}
                  error={
                    Boolean(touched.dtm_hours) && Boolean(errors.dtm_hours)
                  }
                  helperText={touched.dtm_hours && errors.dtm_hours}
                  sx={{ gridColumn: "span 2" }}
                />

                <StyledFormControl>
                  <InputLabel id="dtm-distance-label">Distância</InputLabel>
                  <Select
                    labelId="dtm-distance-label"
                    label="Distância"
                    input={<StyledInputBase />}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.dtm_distance}
                    name="dtm_distance"
                    size="small"
                    error={
                      Boolean(touched.dtm_distance) &&
                      Boolean(errors.dtm_distance)
                    }
                    sx={{
                      padding: ".5rem",
                      borderRadius: "1rem",
                      outline: "none",
                      backgroundColor: theme.palette.primary[500],
                    }}
                  >
                    {distanceClassification.map((category) => (
                      <MenuItem value={category.value} key={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledFormControl>
              </DTMHoursContainer>

              <RatioContainer>
                <Typography align="center">Taxas</Typography>

                <StyledFormControl>
                  <InputLabel id="distance-label">Taxa Flúído</InputLabel>
                  <Select
                    labelId="distance-label"
                    label="Taxa Flúído"
                    input={<StyledInputBase />}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fluid_ratio}
                    name="fluid_ratio"
                    size="small"
                    error={
                      Boolean(touched.fluid_ratio) &&
                      Boolean(errors.fluid_ratio)
                    }
                    sx={{
                      padding: ".5rem",
                      borderRadius: "1rem",
                      outline: "none",
                      backgroundColor: theme.palette.primary[500],
                    }}
                  >
                    {distanceClassification.map((category) => (
                      <MenuItem value={category.value} key={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledFormControl>

                <StyledFormControl>
                  <InputLabel id="equipment-distance-label">
                    Taxa Equipamento
                  </InputLabel>
                  <Select
                    labelId="equipment-distance-label"
                    label="Taxa Equipamento"
                    input={<StyledInputBase />}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.equipment_ratio}
                    name="equipment_ratio"
                    size="small"
                    error={
                      Boolean(touched.equipment_ratio) &&
                      Boolean(errors.equipment_ratio)
                    }
                    sx={{
                      padding: ".5rem",
                      borderRadius: "1rem",
                      outline: "none",
                      backgroundColor: theme.palette.primary[500],
                    }}
                  >
                    {distanceClassification.map((category) => (
                      <MenuItem value={category.value} key={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledFormControl>
              </RatioContainer>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              mt="1.5rem"
              width="100%"
            >
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
        )}
      </Formik>
    </Box>
  );
};

export default EfficiencyForm;
