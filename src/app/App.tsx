import { FC } from 'react';

import { Layout } from '../layout/Layout';
import { Providers } from '../components';
import '../styles';

export const App: FC = () => {
  return (
    <Providers>
      <Layout>layout</Layout>
    </Providers>
  );
};
