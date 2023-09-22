import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/App';

(function () {
  const domContainer = document.getElementById('root');
  if (domContainer === null) return;

  const root = createRoot(domContainer);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
})();
