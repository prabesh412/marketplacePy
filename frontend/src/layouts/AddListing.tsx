import { ReactNode } from 'react';
import Navbar from '@/components/common/Navbar';
import ResponsiveMargin from '@/components/global/ResponsiveMargin';

interface AddListingProps {
  children: ReactNode;
}

const AddListingLayout: React.FC<AddListingProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={ResponsiveMargin()}>{children}</div>
    </>
  );
};

export default AddListingLayout;
