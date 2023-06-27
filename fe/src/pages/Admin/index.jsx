import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import EfficienciesServices from "../../services/EfficienciesServices";
import RigsServices from "../../services/RigsServices";
import { useSelector } from "react-redux";
import useFormatEfficienciesBarChart from "../../hooks/useFormatEfficienciesBarChart";
import Loader from "../../components/Loader";

const Admin = () => {
  const user = useSelector((state) => state.user);
  const [efficiencies, setEfficiencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rigs, setRigs] = useState([]);
  const [selectedRig, setSelectedRig] = useState("SPT 54");
  const [selectedMonth, setSelectedMonth] = useState("Junho");

  useEffect(() => {
    const loadRigEfficiencies = async () => {
      let efficienciesData = null;
      try {
        efficienciesData = user?.rig_id
          ? await EfficienciesServices.listEfficienciesByRigId(user?.rig_id)
          : await EfficienciesServices.listEfficiencies();
        setEfficiencies(efficienciesData);

        const rigs = await RigsServices.listRigs();
        setRigs(rigs);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRigEfficiencies();
  }, []);

  const data = useFormatEfficienciesBarChart(
    efficiencies,
    selectedMonth,
    selectedRig
  );

  return (
    <>
      <Header title="ADMIN DASHBOARD" subtitle="Visão geral de Administrador" />

      <Loader size="100" />
    </>
  );
};

export default Admin;
