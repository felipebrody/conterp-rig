import { Typography, Box, useTheme, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormatDate } from "../../hooks/useFormatDate";
import { useFormatEfficienciesArray } from "../../hooks/useFormatEfficienciesArray";

const ListEfficiencies = ({
  efficiencies,
  selectedRig,
  startDate,
  endDate,
}) => {
  const theme = useTheme();

  const formattedEfficiencies = useFormatEfficienciesArray(
    efficiencies,
    selectedRig,
    startDate,
    endDate
  );

  console.log("Efficiencies: " + formattedEfficiencies);

  return (
    <Box padding="1.25rem">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${theme.palette.primary[500]}`}
        colors={theme.palette.grey[100]}
        p="15px"
      >
        <Typography
          variant="h5"
          color={theme.palette.primary[500]}
          fontWeight="600"
        >
          Útimos Registros
        </Typography>
      </Box>
      {formattedEfficiencies.map((efficiency) => (
        <Box
          key={efficiency.id}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${theme.palette.primary[300]}`}
          padding=".5rem .25rem"
        >
          <Box>
            <Typography variant="h5" fontWeight="600">
              {efficiency.dateString}
            </Typography>

            <Box
              backgroundColor={theme.palette.primary[500]}
              p="5px 10px"
              borderRadius="4px"
              maxHeight="100%"
              overflow="auto"
            >
              {efficiency.efficiency}
            </Box>
          </Box>

          <Box display="flex" justifyContent="center">
            <Link
              to={`/user/list-efficiencies/details/${efficiency.efficiency_id}`}
            >
              <Button variant="contained" color="success">
                <Typography color="#fff">Ver Mais</Typography>
              </Button>
            </Link>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ListEfficiencies;
