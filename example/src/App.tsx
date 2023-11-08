import React, { useCallback, useMemo, useState } from 'react';
import { StatusBar } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Screens
import Playground from './screens/Playground';

// Components
import { HoldMenuProvider } from 'react-native-hold-menu';

// Utils
import { AppContext, IAppContext } from './context/internal';

const App = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const [state, setState] = useState<IAppContext>({
    theme: 'light',
    toggleTheme: () => {},
  });

  const toggleTheme = useCallback(() => {
    setState({ ...state, theme: state.theme === 'light' ? 'dark' : 'light' });
  }, [state]);

  const appContextVariables = useMemo(
    () => ({
      ...state,
      toggleTheme,
    }),
    [state, toggleTheme]
  );

  const onOpen = useCallback(() => null, []);

  const onClose = useCallback(() => null, []);

  return (
    <>
      <AppContext.Provider value={appContextVariables}>
        <StatusBar
          barStyle={state.theme === 'light' ? 'dark-content' : 'light-content'}
        />
        <HoldMenuProvider
          safeAreaInsets={safeAreaInsets}
          onOpen={onOpen}
          onClose={onClose}
        >
          <Playground />
        </HoldMenuProvider>
      </AppContext.Provider>
    </>
  );
};

export default App;
