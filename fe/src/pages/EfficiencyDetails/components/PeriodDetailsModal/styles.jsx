import {Box, colors} from "@mui/material";
import {styled} from "@mui/material/styles";

export const Overlay = styled(Box)(({theme}) => ({
  background: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(5px)",
  position: "fixed",
  width: "100%",
  height: " 100%",
  left: "0",
  top: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999999,
}));

export const Container = styled(Box)(({theme}) => ({
  background: " #fff",
  borderRadius: " 4px",
  padding: "24px",
  boxShadow: "8px 4px 18px rgba(0,0,0, 0.14)",
  maxWidth: "700px",
  maxHeight: "600px",
  width: "100%",
  overflow: "auto",
}));

export const Header = styled(Box)(({theme}) => ({
  marginTop: "0.25rem",
  marginBottom: "2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const ButtonContainer = styled(Box)(({color}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
}));
