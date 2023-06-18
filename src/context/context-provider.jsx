import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase/firebase';
import authContext from './auth-context';

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  console.log('💥 ~ AuthContextProvider ~ user', user);
  
  useEffect(() => {
    setIsLoading(true);
    const unsub = onAuthStateChanged(auth, user => {
      setUser(user);
      setIsLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);

  return <authContext.Provider value={{user,isLoading}}>{children}</authContext.Provider>;
};
export default AuthContextProvider;
