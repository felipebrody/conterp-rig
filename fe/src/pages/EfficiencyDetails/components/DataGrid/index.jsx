import {DataGridContainer} from "./styles";
import {Box, Button, Typography} from "@mui/material";
import {DataGrid as MuiDataGrid} from "@mui/x-data-grid";
import {Link} from "react-router-dom";

export const EfficiencyDetailsDataGrid = ({
  allPeriods,
  handlePeriodModalVisibility,
}) => {
  const columns = [
    {
      field: "oil_well_name",
      headerName: "Poço",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
      renderCell: ({row: {oil_well_name}}) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor="#1c7b7b"
          >
            <Typography> {oil_well_name}</Typography>
          </Box>
        );
      },
    },
    {
      field: "start_hour",
      type: "hour",
      headerName: "Início",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "end_hour",
      type: "hour",
      headerName: "Fim",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "classification",
      headerName: "Classificação",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({row: {description}}) => {
        return (
          <Box
            display="flex"
            gap="1rem"
            width="100%"
            justifyContent="space-between"
          >
            <Box
              width="75%"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {description}
            </Box>

            <Box width="25%" display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="success"
                onClick={() => handlePeriodModalVisibility(description)}
              >
                <Typography color="#fff">Ver Mais </Typography>
              </Button>
            </Box>
          </Box>
        );
      },
    },
  ];
  return (
    <DataGridContainer>
      <MuiDataGrid
        getRowId={(row) => row.id}
        rows={allPeriods}
        columns={columns}
      />
    </DataGridContainer>
  );
};
