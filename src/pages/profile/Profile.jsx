import { Outlet } from "react-router-dom";
import { AsideMnuBar } from "../../components/asideMenuBar/AsideMenuBar";
import { TopMenuBar } from "../../components/topMenuBar/TopMenuBar";
import "./profile.scss";

export const Profile = () => {
  return (
    <div className="profile">
      <div className="aside-menu-bar">
        <AsideMnuBar />
      </div>
      <div className="main-bar">
        <TopMenuBar />
        <div className="tables p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
