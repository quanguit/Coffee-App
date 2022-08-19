export type UserProps = {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
};

export type AuthType = {
  user: UserProps;
  token: string;
  signIn: () => void;
  signOut: () => void;
};
