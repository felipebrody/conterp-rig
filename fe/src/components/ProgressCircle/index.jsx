import { Box, useTheme } from "@mui/material";

const ProgressCircle = ({
  progress = "0.75",
  size = "100",
  radialBackground = "#fff",
  red = false,
}) => {
  const theme = useTheme();

  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${radialBackground} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${
          red ? theme.palette.red[200] : theme.palette.secondary[300]
        } ${angle}deg 360deg),
            ${red ? theme.palette.red[500] : theme.palette.primary[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
