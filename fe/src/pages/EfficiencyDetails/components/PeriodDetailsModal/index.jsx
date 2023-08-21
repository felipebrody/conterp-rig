import ReactDOM from "react-dom";
import {Button, Typography} from "@mui/material";
import {Container, Overlay, ButtonContainer} from "./styles";
import {useTheme} from "@emotion/react";
import {Header} from "./styles";
import CloseIcon from "@mui/icons-material/Close";
export const PeriodDetailsModal = ({
  title,
  subtitle,
  handleModalVisibility,
}) => {
  const theme = useTheme();
  return ReactDOM.createPortal(
    <Overlay>
      <Container>
        <ButtonContainer>
          <Button
            color="error"
            type="button"
            className="cancelButton"
            onClick={() => handleModalVisibility()}
            //disabled={isLoading}
          >
            <CloseIcon color="error" fontSize="large" />
          </Button>
        </ButtonContainer>
        <Header>
          <Typography
            width="100%"
            color={theme.palette.primary[500]}
            variant="h2"
            fontWeight="bold"
            textAlign="center"
          >
            {" "}
            {title}
          </Typography>
        </Header>

        <Typography
          color={theme.palette.primary[500]}
          margin="1rem 1rem 1rem 0"
          variant="body1"
          style={{lineHeight: "1.75"}}
        >
          {" "}
          {subtitle ? subtitle : "Período sem descrição."}
        </Typography>
      </Container>
    </Overlay>,
    document.getElementById("period-modal-root")
  );
};
