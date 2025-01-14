import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { Routes } from '../utils/routesConfig.ts';
import { ToastContainer } from 'react-toastify';
import { ShapeWrapper } from './GlassLayout.js';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper.js';
import { useLogoutMutation } from '@/redux/auth/authApi.js';

const pages = [
  {
    title: 'Главная',
    href: Routes.HOME,
  },
  {
    title: 'Новая форма',
    href: Routes.FORMS_NEW,
  },
];

export const PageLayout = () => {
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleExit = async () => {
    await logout().unwrap();
    navigate(Routes.LOGIN);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <NavLink to={Routes.ME}>Профиль</NavLink>,
    },
    {
      key: '2',
      label: <Button onClick={handleExit}>Выход</Button>,
    },
  ];

  return (
    <ShapeWrapper>
      <GlassWrapper
        settings={{ rounded: 0 }}
        className="p-5 flex items-center justify-center border-b-[1px] border-solid border-gray-200"
      >
        <div className="flex items-center gap-5 w-full max-w-screen-lg justify-between">
          <div className="flex items-center gap-5">
            {pages.map((page) => (
              <NavLink
                className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
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
      </GlassWrapper>
      <div className="mt-5 w-full max-w-screen-lg m-auto">
        <Outlet />
      </div>
      <ToastContainer />
    </ShapeWrapper>
  );
};
