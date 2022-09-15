import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthType, UserProps } from './index.type';
import auth from '@react-native-firebase/auth';
import { Formvalues } from '../../screens/SignUp';
import { generateUserDocument } from '../../utils/firebase';
import { isEqual } from 'lodash';

type Props = {
  children: ReactNode;
};

export const userProps = {
  id: '',
  name: '',
  address: '',
  phone: '',
  email: '',
  photoUrl: '',
};

type responseProps = {
  [key: string]: string;
};

const responseError: responseProps = {
  'auth/user-not-found':
    'There is no user record corresponding to this identifier. The user may have been deleted.',
  'auth/wrong-password':
    'The password is invalid or the user does not have a password.',
  'auth/email-already-in-use':
    'The email address is already in use by another account.',
};

export const defaultResponseSignUp = new Promise(resolve => {
  resolve({
    data: null,
    error: undefined,
  });
});

export const defaultResponseSignIn = new Promise(resolve => {
  resolve({
    error: undefined,
  });
});

const authDefault: any = {
  user: userProps,
  accessToken: '',
  setUser: () => {},
  setAccessToken: () => {},
  signIn: () => defaultResponseSignIn,
  signUp: () => defaultResponseSignUp,
  signOut: () => {},
};

export const AuthContext = createContext<AuthType>(authDefault);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserProps>(userProps);
  const ref = useRef(false);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const storedAsyncStorage = async () => {
      try {
        await AsyncStorage.setItem('User', JSON.stringify(user));
        await AsyncStorage.setItem('AccessToken', JSON.stringify(accessToken));
      } catch (error) {
        console.log('error: ', error);
      }
    };

    // set rule for useEffect() in Context render after useEffect() in App
    if (!ref.current) {
      ref.current = true;
    } else {
      if (user && !isEqual(user, userProps)) {
        storedAsyncStorage();
      }
    }
  }, [accessToken, user]);

  const signIn = async (values: Formvalues) => {
    try {
      await auth().signInWithEmailAndPassword(values.email, values.password);
      return { error: undefined };
    } catch (error: any) {
      return { error: responseError[error.code] };
    }
  };

  const signUp = async (values: Formvalues) => {
    try {
      const newUser = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );

      await signOut();
      const userData = await generateUserDocument(newUser.user, values);
      // return userData;

      // check null and undefined
      if (userData) {
        return userData;
      } else {
        return { data: null, error: 'Have an error!' };
      }
    } catch (error: any) {
      return { data: null, error: responseError[error.code] };
    }
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    await auth().signOut();
  };

  const dataContext = {
    user,
    accessToken,
    setUser,
    setAccessToken,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={dataContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
