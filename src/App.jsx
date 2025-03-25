import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="dashboard-outer">
      <Outlet />
    </div>
  );
}

export default App;
