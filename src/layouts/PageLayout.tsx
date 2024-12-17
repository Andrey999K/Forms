import { NavLink, Outlet } from "react-router-dom";
import { Routes } from "../utils/routesConfig.ts";

export const PageLayout = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="p-5">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <NavLink to={Routes.HOME}>Главная</NavLink>
            <NavLink to={Routes.FORMS_NEW}>Новая форма</NavLink>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
