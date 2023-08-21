import { ReactNode, useState } from 'react';
import { SideNav } from '../common/SideNav';
import Navbar from '../common/Navbar';
import { IconBell, IconHeart } from '@tabler/icons-react';
import { AppShell } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

interface AppLayoutProps {
  children: ReactNode;
}

const links = [
  {
    link: '/',
    iconArg: <IconBell />,
  },

  {
    link: '/contact',
    iconArg: <IconHeart />,
  },
];

const MainLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const matches = useMediaQuery('(min-width: 56.25em)');
  const [showSideNav, setShowSideNav] = useState(matches);
  const handleBurgerChange = () => {
    if (!matches) {
      setShowSideNav((prevShowSideNav) => !prevShowSideNav);
    }
  };
  return (
    <>
      <AppShell
        navbar={<Navbar links={links} showSideNav={handleBurgerChange} />}
        aside={showSideNav || matches ? <SideNav /> : undefined}
      >
        {children}
      </AppShell>
    </>
  );
};

export default MainLayout;
