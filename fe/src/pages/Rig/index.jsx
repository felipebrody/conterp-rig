import { Box } from "@mui/material";
import EfficiencyForm from "../../components/EfficiencyFormCopy";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Rig = () => {
  const { id } = useParams();

  const getPageType = () => {
    return id ? "UPDATE" : "CREATE";
  };

  const [pageType, setPageType] = useState(getPageType(id));

  useEffect(() => {
    setPageType((prevState) => (prevState === "UPDATE" ? "CREATE" : "UPDATE"));
  }, [id]);

  const user = useSelector((state) => state.user);
  return (
    <>
      <Header
        title={`Sonda ${user?.rig_name || ""}`}
        subtitle={
          pageType === "CREATE"
            ? `Submissão dos dados de eficiência da sonda. PageType: ${pageType}`
            : `Atualização dos perídos. PageType: ${pageType}`
        }
      />

      <Box display="flex" justifyContent="center">
        <EfficiencyForm pageType={pageType} id={id} />
      </Box>
    </>
  );
};

export default Rig;
