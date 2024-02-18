import ResponsiveMargin from '@/components/global/ResponsiveMargin';
import Navbar from '@/components/ui/navigation/Navbar';
import { ReactNode } from 'react';

interface AddListingProps {
  children: ReactNode;
}

const ListingDetailLayout: React.FC<AddListingProps> = ({ children }) => {
  return (
    <>
      <Navbar isHomepage={true} />
      <ResponsiveMargin>
        <div>{children}</div>
      </ResponsiveMargin>
    </>
  );
};

export default ListingDetailLayout;
