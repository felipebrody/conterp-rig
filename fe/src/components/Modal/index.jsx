import ReactDOM from "react-dom";
import { Button, Typography } from "@mui/material";
import { Container, Overlay, Footer } from "./styles";
import { useTheme } from "@emotion/react";
const Modal = ({
  title,
  subtitle,
  handleDelete,
  id,
  handleModalVisibility,
}) => {
  const theme = useTheme();
  return ReactDOM.createPortal(
    <Overlay>
      <Container>
        <Typography
          color={theme.palette.red[500]}
          variant="h2"
          fontWeight="bold"
        >
          {" "}
          {title}
        </Typography>
        <Typography color={theme.palette.red[500]} margin="1rem 1rem 1rem 0">
          {" "}
          {subtitle}
        </Typography>
        <Footer>
          <Button
            type="button"
            className="cancelButton"
            onClick={() => handleModalVisibility()}
            //disabled={isLoading}
          >
            Não
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(id)}
          >
            SIM
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById("modal-root")
  );
};

export default Modal;
