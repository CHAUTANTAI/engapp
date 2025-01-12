"use client";

interface AuthProps {
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  return <>{children}</>;
};

export default Auth;
