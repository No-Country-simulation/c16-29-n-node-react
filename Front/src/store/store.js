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
import principalSubjectsSlice from "./slice/principal-subjects-slice";
import principalSubjectSlice from "./slice/principal-subject-slice";
import teacherSubjectsSlice from "./slice/teacher-subjects-slice";
import teacherSubjectSlice from "./slice/teacher-subject-slice";

const persisConfig =  {
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
    principalSubjects: principalSubjectsSlice,
    principalSubject: principalSubjectSlice,
    teacherSubjects: teacherSubjectsSlice,
    teacherSubject: teacherSubjectSlice,
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
