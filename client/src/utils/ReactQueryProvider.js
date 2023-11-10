'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const client = new QueryClient();
function ReactQueryProvider({ children }) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default ReactQueryProvider;
