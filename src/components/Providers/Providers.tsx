import { ReactNode, FC } from 'react';
import { Provider } from 'react-redux';

import { StyledEngineProvider } from '@mui/material';

import { store } from '../../store/store';

type Props = {
  children: ReactNode;
};

export const Providers: FC<Props> = ({ children }) => (
  <StyledEngineProvider injectFirst>
    <Provider store={store}>{children}</Provider>
  </StyledEngineProvider>
);
