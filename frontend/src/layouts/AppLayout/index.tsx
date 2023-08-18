import { ReactNode } from 'react';
import { Paper } from '@mantine/core';
import Navbar from '@/components/Navbar';
import { IconBell, IconHeart } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { index, PATH_APP } from '@/routes';
import { SideNav } from '@/components/SideNav';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const router = useRouter();
  const shouldRenderSideNav = router.pathname !== index.login;

  // TODO : use config file

  return (
    <>
      <header>
        <Navbar links={links} />
      </header>
      <aside>{shouldRenderSideNav && <SideNav />}</aside>
      <main>
        <Paper style={{ height: '100vh', marginLeft: '400px' }} sx={(theme) => ({})}>
          {children}
        </Paper>
      </main>
    </>
  );
};

export default AppLayout;

const links = [
  {
    link: PATH_APP.root,
    iconArg: <IconBell />,
  },
  {
    link: PATH_APP.contact,
    iconArg: <IconHeart />,
  },
];
