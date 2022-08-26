import { Formvalues } from '../../screens/SignUp';

export type UserProps = {
  name: string;
  address: string;
  phone: string;
  email: string;
};

export type AuthType = {
  user: UserProps;
  accessToken: string;
  setUser: (user: UserProps) => void;
  setAccessToken: (token: string) => void;
  signIn: (values: Formvalues) => Promise<any>;
  signUp: (values: Formvalues) => Promise<any>;
  signOut: () => void;
};
