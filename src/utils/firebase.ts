import { FavoriteItem } from './../screens/Detail/index';
import { Formvalues } from '../screens/SignUp';
import firestore from '@react-native-firebase/firestore';

// add more properties into object
export const generateUserDocument = async (
  user: any,
  additionalData: Formvalues,
) => {
  if (!user) {
    return;
  }

  const userRef = firestore().collection('users').doc(`${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const createdAt = new Date();
    const favoriteList: FavoriteItem[] = [];

    try {
      await userRef.set({
        id: user.uid,
        displayName: additionalData.username,
        createdAt,
        address: additionalData.address,
        phone: additionalData.phone,
        name: additionalData.username,
        email: additionalData.email,
        favoriteList,
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }

  return getUserDocument(user.uid);
};

const getUserDocument = async (uid: string) => {
  if (!uid) {
    return {
      data: null,
      error: 'No existing userId',
    };
  }

  try {
    const userDocument = await firestore()
      .collection('users')
      .doc(`${uid}`)
      .get();

    return {
      data: {
        id: uid,
        ...userDocument.data(),
      },
      error: null,
    };
  } catch (error) {
    console.error('Error fetching user', error);
    return {
      data: null,
      error,
    };
  }
};
