import { ReactNode, useState } from 'react';
import Navbar from '@/components/ui/navigation/Navbar';
import ResponsiveMargin from '@/components/global/ResponsiveMargin';

interface AuthlayoutProps {
  children: ReactNode;
}

const Authlayout: React.FC<AuthlayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar isHomepage={false} />
      <div>{children}</div>
    </>
  );
};

export default Authlayout;
