import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useAppSelector } from "./redux/hooks";
import { selectIsLoggedIn } from "./redux/auth/selectors";
import { ToastContainer } from "react-toastify";

const RegistrationPage = lazy(
  () => import("./pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const DictionaryPage = lazy(
  () => import("./pages/DictionaryPage/DictionaryPage")
);
const RecommendPage = lazy(() => import("./pages/RecommendPage/RecommendPage"));
const TrainingPage = lazy(() => import("./pages/TrainingPage/TrainingPage"));

function App() {
  const isAuthenticated = useAppSelector(selectIsLoggedIn);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dictionary" replace />
              ) : (
                <RegistrationPage />
              )
            }
          />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dictionary"
            element={<PrivateRoute component={<DictionaryPage />} />}
          />
          <Route
            path="/recommend"
            element={<PrivateRoute component={<RecommendPage />} />}
          />
          <Route
            path="/training"
            element={<PrivateRoute component={<TrainingPage />} />}
          />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
