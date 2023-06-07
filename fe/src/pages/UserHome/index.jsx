import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EfficienciesServices from "../../services/EfficienciesServices";
import Header from "../../components/Header";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import DailyEfficiencyLineChart from "../../components/DailyEfficiencyLineChart";

const UserHome = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:800px)");
  const [efficiencies, setEfficiencies] = useState([]);
  const user = useSelector((state) => state.user);

  const getRig = () => {
    if (user?.access_level === "adm") {
      return "";
    } else {
      return user?.rig_name;
    }
  };

  const [selectedRig, setSelectedRig] = useState(getRig());

  useEffect(() => {
    const loadRigEfficiencies = async () => {
      let efficienciesData = null;
      try {
        efficienciesData = user?.rig_id
          ? await EfficienciesServices.listEfficienciesByRigId(user?.rig_id)
          : await EfficienciesServices.listEfficiencies();
        setEfficiencies(efficienciesData);

        console.log("eeficiency coming from user home", efficienciesData);
      } catch (error) {
        console.log(error);
      }
    };

    loadRigEfficiencies();
  }, []);

  return (
    <>
      <Header title="User Home Page" subtitle="Página de início do usuário." />

      <Box height="90%" width="100%" padding="2rem">
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(12, minmax(0, 1fr))"
          gridAutoRows="160px"
          sx={{
            "& div": { gridColumn: isNonMobile ? undefined : "span 12" },
          }}
        >
          <Box gridColumn="span 4" gridRow="span 2">
            <DailyEfficiencyLineChart />
          </Box>
          <Box gridColumn="span 8" gridRow="span 2">
            <DailyEfficiencyLineChart
              isDashboard
              efficiencies={efficiencies}
              selectedRig={selectedRig}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserHome;
