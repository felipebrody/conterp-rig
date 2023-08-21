import ReactDOM from "react-dom";
import {Button, Typography} from "@mui/material";
import {Container, Overlay, Footer} from "./styles";
import {useTheme} from "@emotion/react";
const DeleteModal = ({
  title,
  subtitle,
  handleDelete,
  id,
  handleModalVisibility,
  isLoading,
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
            disabled={isLoading}
            type="button"
            className="cancelButton"
            onClick={() => handleModalVisibility()}
            //disabled={isLoading}
          >
            Não
          </Button>
          <Button
            disabled={isLoading}
            variant="contained"
            color="error"
            onClick={() => handleDelete(id)}
          >
            SIM
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById("delete-modal-root")
  );
};

export default DeleteModal;
