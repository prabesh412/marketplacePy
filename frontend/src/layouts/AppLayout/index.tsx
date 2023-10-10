import { ReactNode, useState } from 'react';
import { AppShell } from '@mantine/core';
import Navbar from '@/components/common/Navbar';
import { useMediaQuery } from '@mantine/hooks';
import ResponsiveMargin from '@/components/global/ResponsiveMargin';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const matches = useMediaQuery('(min-width: 56.25em)');

  return (
    <>
      <AppShell navbar={<Navbar />}>
        <div style={ResponsiveMargin()}>{children}</div>
      </AppShell>
    </>
  );
};

export default AppLayout;
