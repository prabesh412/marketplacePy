import { ReactNode } from 'react';
import Navbar from '@/components/ui/navigation/Navbar';
import ResponsiveMargin from '@/components/global/ResponsiveMargin';

interface AddListingProps {
  children: ReactNode;
}

const SearchLayout: React.FC<AddListingProps> = ({ children }) => {
  return (
    <>
      <Navbar isHomepage={false} />
      <div style={ResponsiveMargin()}>{children}</div>
    </>
  );
};

export default SearchLayout;
