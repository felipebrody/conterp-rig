import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Overlay = styled(Box)(({ theme }) => ({
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
}));

export const Container = styled(Box)(({ theme }) => ({
  background: " #fff",
  borderRadius: " 4px",
  padding: "24px",
  boxShadow: "8px 4px 18px rgba(0,0,0, 0.14)",
  maxWidth: " 450px",
  width: "100%",
}));

export const Footer = styled(Box)(({ theme }) => ({
  marginTop: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));
