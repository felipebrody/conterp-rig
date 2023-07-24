import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DataGridContainer = styled(Box)(({ theme }) => ({
  margin: ".5rem",
  height: "100%",
  minWidth: "1100px",
  "& .MuiDataGrid-root": {
    border: "none",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "none",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.primary[500],
    color: "#fff",
    borderBottom: "none",
  },
  "& .MuiDataGrid-virtualScroller": {
    backgroundColor: theme.palette.primary[300],
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: theme.palette.primary[500],
    color: "#fff",
    borderTop: "none",
  },
  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
    color: "#1c7b7b !important",
  },
}));
