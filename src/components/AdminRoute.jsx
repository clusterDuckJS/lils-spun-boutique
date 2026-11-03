import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Loader2 } from 'lucide-react';

export default function AdminRoute({ children }) {
  const { isAdmin, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-brand-ivory text-brand-navy">
        <Loader2 className="w-8 h-8 text-brand-rose animate-spin mb-3" />
        <p className="text-xs uppercase tracking-widest text-brand-muted font-medium">
          Verifying Administrator Privileges...
        </p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
