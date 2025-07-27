import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

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
  const isAuthenticated = false; //temporarily

  return (
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
        <Route path="/dictionary" element={<DictionaryPage />} />
        <Route path="/recommend" element={<RecommendPage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Suspense>
  );
}

export default App;
