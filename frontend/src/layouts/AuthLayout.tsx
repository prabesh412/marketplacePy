import { ReactNode, useState } from 'react';
import Navbar from '@/components/common/Navbar';
import { PATH_APP } from '@/routes';
import { IconBell, IconHeart } from '@tabler/icons-react';
import ResponsiveMargin from '@/components/global/ResponsiveMargin';

interface AuthlayoutProps {
  children: ReactNode;
}

const Authlayout: React.FC<AuthlayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={ResponsiveMargin()}>{children}</div>
    </>
  );
};

export default Authlayout;
