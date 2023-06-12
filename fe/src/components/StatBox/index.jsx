import { Box, Typography, useTheme } from "@mui/material";
import ProgressCircle from "../ProgressCircle";

const StatBox = ({
  icon,
  title = "",
  progress,
  percentage = "100%",
  subtitle = "",
  color = "#1C7b7b",
  red,
}) => {
  const theme = useTheme();
  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box color={color}>
          {icon}
          <Typography variant="h4" fontWeight="bold" sx={{ color: color }}>
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle
            red={red}
            size="40"
            progress={progress}
            radialBackground={theme.palette.grey[400]}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography fontSize=".75rem" variant="h5" sx={{ color: color }}>
          {subtitle}
        </Typography>
        <Typography variant="h5" fontStyle="italic" sx={{ color: color }}>
          {percentage}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
