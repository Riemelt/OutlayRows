import { FC } from 'react';

import { Layout } from '../layout/Layout';
import { Providers } from '../components';
import '../styles';

export const App: FC = () => {
  return (
    <Providers>
      <Layout>
        <div style={{ background: 'green' }}>layout</div>
      </Layout>
    </Providers>
  );
};
