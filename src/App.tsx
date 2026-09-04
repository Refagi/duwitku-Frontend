import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { lazy, Suspense } from "react";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { FullPageSpinner } from "./components/layouts/FullPageSpinner";
import { useThemeSync } from "./hooks/useThemeSync";

const DashboardPage = lazy(() =>import("@/pages/dashboard/DashboardPage").then((m) => ({default: m.DashboardPage})),);
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage").then((m) => ({default: m.RegisterPage})));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage").then((m) => ({ default: m.LoginPage })));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout").then((m) => ({ default: m.AuthLayout })));
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout").then((m) => ({default: m.DashboardLayout})));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));
const AccountsPage = lazy(() => import("@/pages/accounts/AccountsPage").then(m => ({ default: m.AccountsPage })));
const CategoryPage = lazy(() => import("@/pages/categories/CategoryPage").then(m => ({ default: m.CategoryPage })));
const HistoryPage = lazy(() => import("@/pages/histories/HistoryPage").then(m => ({ default: m.HistoryPage })));
const ReportsPage = lazy(() => import("@/pages/reports/ReportsPage").then(m => ({ default: m.ReportsPage })));
const SavingsPage = lazy(() => import("@/pages/savings/SavingsPage").then(m => ({ default: m.SavingsPage })));


function App() {
  useThemeSync();
  return (
    <BrowserRouter>
      <Suspense fallback={<FullPageSpinner />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          {/* <Route path="/auth/google/callback" element={<GoogleCallbackPage />} /> */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="accounts" element={<AccountsPage />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="savings" element={<SavingsPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="reports" element={<ReportsPage />} />
            
          </Route>

          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
