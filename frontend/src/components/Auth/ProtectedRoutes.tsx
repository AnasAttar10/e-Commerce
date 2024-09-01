import { useAppSelector } from '@store/hooks';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAppSelector((state) => state.auth);
  if (!token) return <Navigate to={'/login?message=Login-Required'} />;
  return <>{children}</>;
};

export default ProtectedRoutes;
