import { ReactNode, FC } from 'react';

import { StyledEngineProvider } from '@mui/material';

type Props = {
  children: ReactNode;
};

export const Providers: FC<Props> = ({ children }) => (
  <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
);
