import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Routes } from "../utils/routesConfig.js";
import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";

const pages = [
  {
    title: "Главная",
    href: Routes.HOME,
  },
  {
    title: "Новая форма",
    href: Routes.FORMS_NEW,
  },
];

export const PageLayout = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate(Routes.LOGIN);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <NavLink to={Routes.ME}>Профиль</NavLink>,
    },
    {
      key: "2",
      label: <Button onClick={handleExit}>Выход</Button>,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="p-5 flex items-center justify-center border-b-[1px] border-solid border-gray-200">
        <div className="flex items-center gap-5 w-full max-w-screen-lg justify-between">
          <div className="flex items-center gap-5">
            {pages.map((page) => (
              <NavLink
                className={({ isActive }) => (isActive ? "text-blue-500" : "")}
                to={page.href}
                key={page.href}
              >
                {page.title}
              </NavLink>
            ))}
          </div>
          <Dropdown menu={{ items }} placement="bottomLeft">
            <div className="flex justify-center items-center p-2 rounded-full bg-blue-400 cursor-pointer text-white">
              <UserOutlined />
            </div>
          </Dropdown>
        </div>
      </div>
      <div className="mt-5 w-full max-w-screen-lg m-auto">
        <Outlet />
      </div>
    </div>
  );
};
