import Header from "../../components/Header";
import {BillingDashboard} from "../BillingDashboard";
import {BillingDashboardProvider} from "../BillingDashboard/BillingDashboardContext";

const Admin = () => {
  return (
    <>
      <Header title="ADMIN DASHBOARD" subtitle="Visão geral de Administrador" />

      <BillingDashboardProvider>
        <BillingDashboard />
      </BillingDashboardProvider>
    </>
  );
};

export default Admin;
