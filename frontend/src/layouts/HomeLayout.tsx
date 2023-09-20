import { ReactNode, useState } from 'react';
import { AppShell } from '@mantine/core';
import Navbar from '@/components/Navbar';
import { IconBell, IconHeart } from '@tabler/icons-react';
import { PATH_APP } from '@/routes';
import { SideNav } from '@/components/SideNav';
import { useMediaQuery } from '@mantine/hooks';

interface AppLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<AppLayoutProps> = ({ children }) => {
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

export default HomeLayout;

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
