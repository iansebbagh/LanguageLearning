import * as React from 'react';
import {View, ActivityIndicator, Platform} from 'react-native';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer, createTransform} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import Flatted from 'flatted';
import App from './App';
import reducer from './reducers';
import 'react-native-root-siblings';

export const transformCircular = createTransform(
  (inboundState: any, key: any) => Flatted.stringify(inboundState),
  (outboundState: any, key: any) => Flatted.parse(outboundState),
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const logger = (createLogger as any)();

const dev = process.env.NODE_ENV === 'development';
let middleware = dev ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  dev ? composeWithDevTools(middleware) : middleware,
) as any;

const persistor = persistStore(store);

export default () => (
  <Provider store={store}>
    <PersistGate
      loading={
        <View
          style={{
            width: '100%',
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <ActivityIndicator size={Platform.OS == 'ios' ? 'large' : 60} color="#bc2b78" />
          {/* // TODO: show something Circulr Progress */}
        </View>
      }
      persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
