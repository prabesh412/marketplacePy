import { ReactNode, useState } from 'react';
import Navbar from '@/components/Navbar';
import { PATH_APP } from '@/routes';
import { IconBell, IconHeart } from '@tabler/icons-react';
import Login from '@/pages/users/auth';

interface AuthlayoutProps {
  children: ReactNode;
}

const Authlayout: React.FC<AuthlayoutProps> = ({ children }) => {
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

  return (
    <>
      <Navbar links={links} />
      {children}
    </>
  );
};

export default Authlayout;
