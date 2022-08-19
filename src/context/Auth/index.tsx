import React, { createContext, ReactNode } from 'react';
import { AuthType } from './index.type';

type Props = {
  children: ReactNode;
};

const userProps = {
  name: '',
  address: '',
  phoneNumber: '',
  email: '',
};

const authDefault = {
  user: userProps,
  token: '',
  signIn: () => {},
  signOut: () => {},
};

export const AuthContext = createContext<AuthType>(authDefault);

const AuthProvider = ({ children }: Props) => {
  const user = userProps;
  const token = '';
  const signIn = () => {};
  const signOut = () => {};

  const dataContext = {
    user,
    token,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={dataContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
