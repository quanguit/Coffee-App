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

type Props = {
  children: ReactNode;
};

const userProps = {
  name: '',
  address: '',
  phone: '',
  email: '',
};

export const defaultResponse = new Promise(resolve => {
  resolve({
    data: null,
    error: undefined,
  });
});

const authDefault = {
  user: userProps,
  accessToken: '',
  setUser: () => {},
  setAccessToken: () => {},
  signIn: () => defaultResponse,
  signUp: () => defaultResponse,
  signOut: () => {},
};

export const AuthContext = createContext<AuthType>(authDefault);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserProps>({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const ref = useRef(false);
  const [accessToken, setAccessToken] = useState('');

  const signIn = async (values: Formvalues) => {
    try {
      await auth().signInWithEmailAndPassword(values.email, values.password);
    } catch (error) {
      return { data: null, error: 'Have an error!' };
    }
  };

  const signUp = async (values: Formvalues) => {
    try {
      const newUser = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      const userData = await generateUserDocument(newUser.user, values);
      // return userData;

      // check null and undefined
      if (userData) {
        await auth().signOut();
        return userData;
      } else {
        return { data: null, error: 'Have an error!' };
      }
    } catch (error) {
      return { data: null, error: 'Have an error!' };
    }
  };

  const signOut = async () => {
    await auth().signOut();
    setUser(userProps);
    setAccessToken('');
  };

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
      storedAsyncStorage();
    }
  }, [accessToken, user]);

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
