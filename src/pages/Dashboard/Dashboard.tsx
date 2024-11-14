import DashboardCardOne from "../../Components/dashboard/DashboardCardOne";
import DashboardTable from "../../Components/dashboard/DashboardTable";

const Dashboard = () => {
  return (
    <div className="md:p-6 px-3 space-y-5 pt-4">
      <DashboardCardOne />
      <DashboardTable />
    </div>
  );
};

export default Dashboard;
