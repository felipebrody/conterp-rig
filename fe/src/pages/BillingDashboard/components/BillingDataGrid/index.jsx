import {Box, Typography} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {useTheme} from "@mui/material";
import {DataGridContainer} from "./styles";
import {useBillingDataGrid} from "./useBillingDataGrid";

const BillingDataGrid = () => {
  const {isLoading, rigs, efficienciesToDataGrid, hasData} =
    useBillingDataGrid();

  const columns = [
    {
      field: "lineName",
      headerName: "Taxa",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },
  ];

  rigs.forEach(({name}) => {
    columns.push({
      field: name,
      headerName: name,
      flex: 0.6,
      headerAlign: "center",
      align: "center",
      renderCell: (item) => {
        return (
          <Box
            borderRadius=".25rem"
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor="#1c7b7b"
          >
            <Typography> R$ {item.value?.toLocaleString()}</Typography>
          </Box>
        );
      },
    });
  });

  const theme = useTheme();

  return (
    <>
      <DataGridContainer theme={theme}>
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row.id}
          rows={efficienciesToDataGrid}
          columns={columns}
          components={{Toolbar: GridToolbar}}
          density="compact"
        />
      </DataGridContainer>
    </>
  );
};

export default BillingDataGrid;
