import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { CheckCircleOutlineTwoTone } from "@mui/icons-material";
//import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import toast from "../../utils/toast";
import EfficienciesServices from "../../services/EfficienciesServices";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../Header";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { useFormatEfficienciesArray } from "../../hooks/useFormatEfficienciesArray";
import { DataGridContainer } from "./styles";
import { Link } from "react-router-dom";
import useBillingDataGrid from "../../hooks/useBillingDataGrid";

const BillingDataGrid = ({ selectedMonth }) => {
  const [efficiencies, setEfficiencies] = useState([]);

  const columns = [
    {
      field: "lineName",
      headerName: "Taxa",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "SPT 111",
      headerName: "SPT 111",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (item) => {
        return (
          <Box
            width="70%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor="#1c7b7b"
          >
            <Typography> R$ {item.value}</Typography>
          </Box>
        );
      },
    },
    {
      field: "SPT 54",
      headerName: "SPT 54",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (item) => {
        return (
          <Box
            width="70%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor="#1c7b7b"
          >
            <Typography> R$ {item.value}</Typography>
          </Box>
        );
      },
    },
    {
      field: "SPT 88",
      headerName: "SPT 88",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (item) => {
        return (
          <Box
            width="70%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor="#1c7b7b"
          >
            <Typography> R$ {item.value}</Typography>
          </Box>
        );
      },
    },
  ];

  const user = useSelector((state) => state.user);

  const formattedItems = useBillingDataGrid(efficiencies, selectedMonth);

  console.log("Formatted Items", formattedItems);

  const transformedData = [];

  // Cria o objeto para cada taxa
  /* transformedData.push({
    id: 1,
    taxName: "totalValue",
    lineName: "Valor Total",
  }); */
  transformedData.push({
    id: 2,
    taxName: "availableHoursBilling",
    lineName: "Horas Disponível",
  });
  transformedData.push({
    id: 3,
    taxName: "dtmLessThanTwentyBilling",
    lineName: "DTM <= 20",
  });
  transformedData.push({
    id: 4,
    taxName: "dtmBetweenTwentyAndFiftyBilling",
    lineName: "20 < DTM <= 50",
  });
  transformedData.push({
    id: 5,
    taxName: "equipmentLessThanTwentyBilling",
    lineName: "Taxa Equipamento < 20",
  });
  transformedData.push({
    id: 6,
    taxName: "equipmentBetweenTwentyAndFiftyBilling",
    lineName: "20 < Taxa Equipamento <= 50 ",
  });
  transformedData.push({
    id: 7,
    taxName: "equipmentGreaterThanFiftyBilling",
    lineName: "Taxa Equipamento > 50",
  });
  transformedData.push({
    id: 8,
    taxName: "fluidLessThanTwentyBilling",
    lineName: "Taxa Flúido < 20",
  });
  transformedData.push({
    id: 9,
    taxName: "fluidBetweenTwentyAndFiftyBilling",
    lineName: "20 < Taxa Flúido <= 50 ",
  });
  transformedData.push({
    id: 10,
    taxName: "fluidGreaterThanFiftyBilling",
    lineName: "Taxa Flúdio > 50",
  });

  // Itera sobre os dados originais e adiciona as informações correspondentes ao objeto transformado
  formattedItems.forEach((item) => {
    transformedData.forEach((tax) => {
      if (!tax.hasOwnProperty(item.rig)) {
        tax[item.rig] = {};
      }
      tax[item.rig] = item[tax.taxName];
    });
  });

  console.log(transformedData);

  console.log("transformed data magicaly", transformedData);

  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    setIsLoading(true);
    const loadEfficiencies = async () => {
      let efficienciesData = null;
      try {
        efficienciesData = user?.rig_id
          ? await EfficienciesServices.listEfficienciesByRigId(user?.rig_id)
          : await EfficienciesServices.listEfficiencies();
        setEfficiencies(efficienciesData);
      } catch (error) {
        toast({
          type: "error",
          text: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadEfficiencies();
  }, [user?.rig_id]);

  return (
    <DataGridContainer theme={theme}>
      <DataGrid
        loading={isLoading}
        getRowId={(row) => row.id}
        rows={transformedData}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </DataGridContainer>
  );
};

export default BillingDataGrid;
