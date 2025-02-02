import { useLogoutMutation } from '@/redux/auth/authApi.js';
import { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ROUTES } from '../utils/routesConfig.ts';
import { ShapeWrapper } from './GlassLayout.js';
import { useLocation } from 'react-router-dom';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper.tsx';
import { FiLogOut } from 'react-icons/fi';

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

  /*
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
  */

  const pages = [
    {
      title: 'Главная',
      href: ROUTES.HOME,
    },
    {
      title: 'Новая форма',
      href: ROUTES.FORMS_NEW,
    },
    // {
    //   title: 'Мой аккаунт',
    //   dropdown: true,
    //   menu: menuItems,
    //   active: location.pathname === ROUTES.ME,
    // },
    {
      title: 'Профиль',
      href: ROUTES.ME,
    },
    {
      title: (
        // TODO:
        <span onClick={handleExit}>
          <FiLogOut size={20} />
        </span>
      ),
      href: ROUTES.FORMS_NEW,
    },
  ];

  return (
    <ShapeWrapper>
      <header>
        <GlassWrapper
          settings={{ rounded: 0 }}
          className="py-5 flex m-auto items-center justify-center border-b-[1px] border-solid border-gray-200"
        >
          <div className="flex justify-between items-center gap-5 px-8 w-full max-w-screen-lg">
            <NavLink to={ROUTES.HOME}>
              <div className="absolute top-1.5 text-[35px] font-bold text-[#f97316] font-golos hidden sm:block">
                Forms
              </div>
            </NavLink>
            <div className="flex items-center gap-8">
              {pages.map((page) => (
                <NavLink
                  to={page.href}
                  key={page.href}
                  className={({ isActive }) =>
                    `hover:text-orange-500 transition-colors ${
                      isActive ||
                      (page.href === ROUTES.FORMS_NEW && location.pathname.startsWith('/forms'))
                        ? 'text-orange-500 font-medium'
                        : 'text-gray-700'
                    }`
                  }
                  end
                >
                  {page.title}
                </NavLink>
              ))}
            </div>
          </div>
        </GlassWrapper>
      </header>
      <div className="mt-5 w-full max-w-screen-lg m-auto px-4">{children || <Outlet />}</div>
    </ShapeWrapper>
  );
};
