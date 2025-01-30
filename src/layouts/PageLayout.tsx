import { useLogoutMutation } from '@/redux/auth/authApi.js';
import { Button, Dropdown, MenuProps } from 'antd';
import { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ROUTES } from '../utils/routesConfig.ts';
import { ShapeWrapper } from './GlassLayout.js';
import { useLocation } from 'react-router-dom';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper.tsx';

export const PageLayout = ({ children }: { children?: ReactNode }) => {
  const [logout] = useLogoutMutation();
  const location = useLocation();

  const handleExit = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.log('####: logout error', error);
    }
  };

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <NavLink to={ROUTES.ME} className="flex justify-center items-center text-center mb-2">
          Настройки аккаунта
        </NavLink>
      ),
    },
    {
      key: '2',
      label: (
        <Button type="primary" className="w-full" onClick={handleExit}>
          Выход
        </Button>
      ),
    },
  ];

  const pages = [
    {
      title: 'Главная',
      href: ROUTES.HOME,
    },
    {
      title: 'Новая форма',
      href: ROUTES.FORMS_NEW,
    },
    {
      title: 'Мой аккаунт',
      dropdown: true,
      menu: menuItems,
      active: location.pathname === ROUTES.ME,
    },
  ];

  return (
    <header>
      <ShapeWrapper>
        <GlassWrapper
          settings={{ rounded: 0 }}
          className="p-5 flex items-center justify-center border-b-[1px] border-solid border-gray-200"
        >
          <NavLink to={ROUTES.HOME}>
            <div className="cursor-pointer ml-8">
              <img src="/logo-forms.png" alt="Logo Image" style={{ width: '190px' }} />
            </div>
          </NavLink>
          <div className="flex items-center gap-5 w-full max-w-screen-lg justify-end mr-8">
            <div className="flex items-center gap-8 ">
              {pages.map((page) =>
                page.dropdown ? (
                  <Dropdown key={page.title} menu={{ items: page.menu }} placement="bottom">
                    <div
                      className={`cursor-pointer transition-colors ${
                        page.active ? 'text-orange-500' : 'hover:text-orange-500 text-gray-700'
                      }`}
                    >
                      {page.title}
                    </div>
                  </Dropdown>
                ) : (
                  page.href && (
                    <NavLink
                      to={page.href}
                      key={page.href}
                      className={({ isActive }) =>
                        `hover:text-orange-500 transition-colors ${
                          isActive ||
                          (page.href === ROUTES.FORMS_NEW && location.pathname.startsWith('/forms'))
                            ? 'text-orange-500'
                            : 'text-gray-700'
                        }`
                      }
                      end
                    >
                      {page.title}
                    </NavLink>
                  )
                )
              )}
            </div>
          </div>
        </GlassWrapper>
        <div className="mt-5 w-full max-w-screen-lg m-auto">{children || <Outlet />}</div>
      </ShapeWrapper>
    </header>
  );
};
