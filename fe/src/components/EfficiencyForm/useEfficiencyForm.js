import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AxiosEfficienciesServices} from "../../services/AxiosEfficienciesServices";
import toast from "../../utils/toast";
import {useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {
  Box,
  Button,
  useMediaQuery,
  useTheme,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {useSelector} from "react-redux";
import EfficiencyMapper from "../../services/mappers/EfficiencyMapper";
import {stringify, v4 as uuidv4} from "uuid";

export const useEfficiencyForm = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const theme = useTheme();

  const {isLoading, mutateAsync} = useMutation(
    AxiosEfficienciesServices.create
  );

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

  const [minutes, setMinutes] = useState(0);
  // const [remainingMinutes, setRemainingMinutes] = useState(1440);

  const oilWells = [
    {
      id: "2739ccbc-15ed-4d12-ae3b-bbadd8f84304",
      name: "MBW-104",
    },
    {
      id: "21686110-f6d2-44f7-befa-300b7499e42a",
      name: "MBW-94",
    },
    {
      id: "b6ef6cc3-95f0-4d66-acb5-673a50344dde",
      name: "MBW-64",
    },
  ];

  const isFormValid = minutes === 1440 && date;

  const isNonMobile = useMediaQuery("(min-width:800px)");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      bodyDate,
      available_hours,
      dtm_hours,
      equipment_ratio,
      fluid_ratio,
      gloss_periods,
      repair_periods,
      working_periods,
      user_id,
      rig_id,
      dtm_periods,
      efficiency,
    } = EfficiencyMapper.toDomain(periods, date, user);

    try {
      await mutateAsync({
        bodyDate,
        available_hours,
        dtm_hours,
        equipment_ratio,
        fluid_ratio,
        gloss_periods,
        repair_periods,
        working_periods,
        user_id,
        rig_id,
        dtm_periods,
        efficiency,
      });

      toast({
        type: "default",
        text: "Dados Enviados com Sucesso!",
      });

      navigate(`/user/home`);
    } catch (error) {
      console.log("caiu dentro do try/catch ### error");
      console.log(error);
      toast({
        type: "error",
        text: error.response.data.error,
      });
    } finally {
    }
  };

  const handleDateChange = (value) => {
    setDate(value);
  };

  const handleStartHourChange = (id, value) => {
    const newPeriods = periods.map((period) => {
      return period.id === id ? {...period, startHour: value} : period;
    });

    setPeriods(newPeriods);
  };

  const handleEndHourChange = (id, value, index) => {
    const newPeriods = periods.map((period) => {
      return period.id === id ? {...period, endHour: value} : period;
    });

    setPeriods(newPeriods);
  };

  const handleTypeChange = (id, event) => {
    const newPeriods = periods.map((period) => {
      return period.id === id ? {...period, type: event.target.value} : period;
    });

    setPeriods(newPeriods);
  };

  const handleOilWellChange = (id, event) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? {...period, oilWell: event.target.value}
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleChangeDescription = (id, event) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? {...period, description: event.target.value}
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleGlossClassificationChange = (id, event) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? {...period, glossClassification: event.target.value}
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleDTMDistanceChange = (id, event) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? {...period, DTMDistance: event.target.value}
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleRepairClassificationChange = (id, event) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? {...period, repairClassification: event.target.value}
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleEquipmentRatioChange = (id, event) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? {...period, equipmentRatio: event.target.value}
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleFluidRatioChange = (id, event) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? {...period, fluidRatio: event.target.value}
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
        startHour: periods[periods.length - 1].endHour,
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

  const calculateRemainingMinutes = () => {
    const remainingMinutes = 1440 - minutes;
    return remainingMinutes > 0 ? remainingMinutes : 0;
  };

  const remainingMinutes = useMemo(
    () => calculateRemainingMinutes(),
    [minutes]
  );

  useEffect(() => {
    let minutesSelected = 0;

    const calculateRemainingMinutes = ({
      endHour,
      startHour,
      minutesSelected,
    }) => {
      if (!endHour) {
        return minutesSelected;
      }
      let startHourInMinutes = startHour?.$H * 60 + startHour?.$m;
      let endHourInMinutes = 0;

      if (endHour.$H === 23 && endHour.$m === 55) {
        endHourInMinutes = 1440;
      } else {
        endHourInMinutes = endHour?.$H * 60 + endHour?.$m;
      }

      minutesSelected += endHourInMinutes - startHourInMinutes;

      return minutesSelected;
    };
    for (const {endHour, startHour} of periods) {
      minutesSelected = calculateRemainingMinutes({
        endHour,
        startHour,
        minutesSelected,
      });
    }
    setMinutes(minutesSelected);

    //setRemainingMinutes(1440 - minutes);
  }, [periods]);

  return {
    handleSubmit,
    handleDateChange,
    handleStartHourChange,
    handleEndHourChange,
    handleTypeChange,
    handleOilWellChange,
    handleChangeDescription,
    handleGlossClassificationChange,
    handleDTMDistanceChange,
    handleRepairClassificationChange,
    handleEquipmentRatioChange,
    handleFluidRatioChange,
    handleDeletePeriod,
    addPeriod,
    remainingMinutes,
    periods,
    isFormValid,
    isNonMobile,
    isLoading,
    theme,
    oilWells,
    date,
  };
};
