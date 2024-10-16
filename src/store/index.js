import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import lalinReducer from './lalin';
import gerbangReducer from './gerbang';
import contentReducer from './content';

const store = configureStore({
  reducer: {
    auth: authReducer,
    lalins: lalinReducer,
    gerbang: gerbangReducer,
    content: contentReducer,
  },
});

export default store;
