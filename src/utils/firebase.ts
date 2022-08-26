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
    const createAt = new Date();

    try {
      await userRef.set({
        displayName: additionalData.username,
        createAt,
        address: additionalData.email,
        phone: additionalData.phone,
        username: additionalData.username,
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
