'use client';

import { store } from '@/redux/store';
import { Provider } from 'react-redux';

interface ReduxWrapperProp {
  children: React.ReactNode;
}

export default function ReduxWrapper({ children }: ReduxWrapperProp) {
  return <Provider store={store}>{children}</Provider>;
}
