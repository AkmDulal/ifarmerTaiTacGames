import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ticTacToeReducer from '@/store/features/ticTacToe/slice';
import productsReducer from '@/store/features/products/slice';

const ticTacToePersistConfig = {
  key: 'ticTacToe',
  storage,
  whitelist: ['leaderboard'],
};

const productsPersistConfig = {
  key: 'products',
  storage,
  whitelist: ['products', 'categories'],
};

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      ticTacToe: persistReducer(ticTacToePersistConfig, ticTacToeReducer),
      products: persistReducer(productsPersistConfig, productsReducer),
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];