import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import selectReducer from "../reducer/reducer";
import profesorReducer from "./slice/profesorSlice";
import { subjectsReducer } from "./slice/subjectsSlice";
import  tutorReducer  from "./slice/tutorSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  REHYDRATE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import principalSubjectSlice from "./slice/principal-subject-slice";

const persisConfig = {
  key: "auth",
  storage
};

const persistedReducer = persistReducer(persisConfig, authReducer);

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
const store = configureStore({
  reducer: {
    auth: persistedReducer,
    teachers: profesorReducer,
    select: selectReducer,
    principalSubject: principalSubjectSlice,
    tutor: tutorReducer,
    subjects: subjectsReducer,
    students: selectReducer,
    tutorsOptions: selectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

export default store
