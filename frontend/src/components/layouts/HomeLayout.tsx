import { ReactNode } from 'react';
import Navbar from '@/components/common/navigation/Navbar';
import ResponsiveMargin from '@/components/global/ResponsiveMargin';

interface AppLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar isHomepage={true} />
      <div style={ResponsiveMargin()}>{children}</div>
    </>
  );
};

export default HomeLayout;
