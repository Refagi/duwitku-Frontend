import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { FullPageSpinner } from "@/components/layouts/FullPageSpinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <FullPageSpinner />;
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
