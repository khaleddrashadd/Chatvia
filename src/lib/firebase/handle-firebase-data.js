import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export const handleSetDoc = async (collection, id, data) => {
  await setDoc(doc(db, collection, id), data);
};

export const handleUpdateDoc = async (collection, id, data) => {
  await updateDoc(doc(db, collection, id), data);
};
