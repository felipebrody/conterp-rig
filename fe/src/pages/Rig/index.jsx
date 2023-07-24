import { Box } from "@mui/material";
import EfficiencyForm from "../../components/EfficiencyFormCopy";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

const Rig = () => {
  const { id } = useParams();

  const user = useSelector((state) => state.user);
  return (
    <>
      <Header
        title={`Sonda ${user?.rig_name || ""}`}
        subtitle="Submissão dos dados de eficiência da sonda."
      />

      <Box display="flex" justifyContent="center">
        <EfficiencyForm id={id} />
      </Box>
    </>
  );
};

export default Rig;
