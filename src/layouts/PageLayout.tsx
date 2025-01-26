import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper.js';
import { useLogoutMutation } from '@/redux/auth/authApi.js';
import { IconUserCircle } from '@tabler/icons-react';
import { Button, Dropdown, MenuProps } from 'antd';
import { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ROUTES } from '../utils/routesConfig.ts';
import { ShapeWrapper } from './GlassLayout.js';

const pages = [
  {
    title: 'Главная',
    href: ROUTES.HOME,
  },
  {
    title: 'Новая форма',
    href: ROUTES.FORMS_NEW,
  },
];

export const PageLayout = ({ children }: { children?: ReactNode }) => {
  const [logout] = useLogoutMutation();

  const handleExit = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.log('####: logout error', error);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <NavLink to={ROUTES.ME} className="flex justify-center items-center text-center mb-2">
          Мой профиль
        </NavLink>
      ),
    },
    {
      key: '2',
      label: (
        <Button color="default" variant="solid" className="w-full" onClick={handleExit}>
          Выход
        </Button>
      ),
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
                className={({ isActive }) => (isActive ? 'text-orange-500' : '')}
                to={page.href}
                key={page.href}
              >
                {page.title}
              </NavLink>
            ))}
          </div>
          <Dropdown menu={{ items }} placement="bottom">
            <IconUserCircle stroke={1.5} size={30} color="#FA913C" className="cursor-pointer" />
          </Dropdown>
        </div>
      </GlassWrapper>
      <div className="mt-5 w-full max-w-screen-lg m-auto">{children || <Outlet />}</div>
      <ToastContainer />
    </ShapeWrapper>
  );
};
