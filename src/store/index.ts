import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authReducer";
import crudReducer from "./crudReducer";
import authReducer from "./authReducer";

const store = configureStore({
  reducer: {
    // auth: authReducer,
    crud: crudReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
