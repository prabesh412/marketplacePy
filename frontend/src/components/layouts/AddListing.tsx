import { ReactNode } from 'react';
import Navbar from '@/components/ui/navigation/Navbar';
import ResponsiveMargin from '@/components/global/ResponsiveMargin';

interface AddListingProps {
  children: ReactNode;
}

const AddListingLayout: React.FC<AddListingProps> = ({ children }) => {
  return (
    <>
      <Navbar isHomepage={false} />
      <ResponsiveMargin>
        <div>{children}</div>
      </ResponsiveMargin>
    </>
  );
};

export default AddListingLayout;
