import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers/reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userData', 'aadharNumber', 'panNumber', 'profileImage', 'drivers']

};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
