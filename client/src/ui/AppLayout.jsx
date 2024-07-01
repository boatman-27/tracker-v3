import { Outlet } from "react-router-dom";
import MenuBar from "./MenuBar";

function AppLayout() {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <MenuBar />
      </div>
      <div className="flex-grow bg-gray-500 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
