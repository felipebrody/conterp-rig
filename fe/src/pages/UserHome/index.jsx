//Components
import Header from "../../components/Header";

import Dashboard from "../Dashboard";

const UserHome = () => {
  return (
    <>
      <Header title="DASHBOARD" subtitle="Página de início do usuário." />

      <Dashboard
        dataType="hours"
        chartKeys="availableHours"
        barChartLegend="Horas Disponível"
      />
    </>
  );
};

export default UserHome;
