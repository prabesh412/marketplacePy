import { ReactNode } from 'react';
import Navbar from '@/components/ui/navigation/Navbar';
import ResponsiveMargin from '@/components/global/ResponsiveMargin';

interface AppLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar isHomepage={true} />
      <ResponsiveMargin>
        <div>{children}</div>
      </ResponsiveMargin>
    </>
  );
};

export default HomeLayout;
