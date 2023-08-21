//Components
import Header from "../../components/Header";

import Dashboard from "../Dashboard";
import {DashboardProvider} from "../Dashboard/DashboardContext";

const UserHome = () => {
  return (
    <>
      <Header title="DASHBOARD" subtitle="Página de início do usuário." />

      <DashboardProvider>
        <Dashboard
          dataType="hours"
          chartKeys="availableHours"
          barChartLegend="Horas Disponível"
        />
      </DashboardProvider>
    </>
  );
};

export default UserHome;
