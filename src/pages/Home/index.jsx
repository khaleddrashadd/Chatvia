import { BsPeople } from 'react-icons/bs';
import { BiMoon } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import People from './People';
import Messages from './Messages';
import { auth, db } from '../../lib/firebase/firebase';
import { useAuth } from '../../hooks/use-auth';
import { BsChatQuote } from 'react-icons/bs';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { toggleTheme } from '../../utils/theme-control';
import { handleSetDoc } from '../../lib/firebase/handle-firebase-data';
const Home = () => {
  const { user } = useAuth();
  const [userQuery, setUserQuery] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [lastMessage, setLastMessage] = useState('');
  const [isListOpen, setIsListOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const idRef = useRef();

  const handleSelect = async currUser => {
    setCurrentUser(currUser);
    const combinedId =
      user.uid > currUser.uid
        ? user.uid + currUser.uid
        : currUser.uid + user.uid;

    idRef.current = combinedId;

    try {
      const res = await getDoc(doc(db, 'chats', combinedId));
      if (!res.exists()) {
        await handleSetDoc('chats', combinedId, { messages: [] });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [`${combinedId}.userInfo`]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', currUser.uid), {
          [`${combinedId}.userInfo`]: {
            uid: currUser.uid,
            displayName: currUser.enteredName,
            photoURL: currUser.photoURL,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        });
      }
      setIsSelected(true);
      setIsListOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLastMessage = useCallback((chats, chatId) => {
    setLastMessage(chats[chatId]?.lastMessage?.text);
  }, []);

  const handleToggleFriend = () => {
    setIsListOpen(prev => !prev);
  };

  useEffect(() => {
    const userRef = collection(db, 'users');

    const usersQuery = query(
      userRef,
      where('enteredName', '>=', inputValue),
      where('enteredName', '<', inputValue + '\uf8ff')
    );
    const unsub = onSnapshot(usersQuery, data => {
      const users = [];
      data.forEach(userData => {
        if (userData.data().uid !== user.uid) {
          users.push(userData.data());
        }
      });
      setUserQuery(users);
    });
    return () => {
      unsub();
    };
  }, [inputValue]);
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-dark">
      <div className="flex flex-col items-center gap-24 text-3xl bg-white text-black dark:bg-darker dark:text-white w-12 py-4">
        <BsPeople
          onClick={handleToggleFriend}
          className={`cursor-pointer ${
            isListOpen && 'text-main'
          } hover:text-main-dark`}
        />

        <BsSun
          onClick={() => toggleTheme()}
          className="cursor-pointer hover:text-main-dark hidden dark:block"
        />

        <BiMoon
          onClick={() => toggleTheme()}
          className="cursor-pointer hover:text-main-dark dark:hidden"
        />
      </div>
      {isListOpen && (
        <div className="dark:bg-darkest bg-lighter">
          <h3 className="font-bold text-main text-center rounded-md text-3xl mb-4">
            Chatvia
          </h3>
          <div className="flex flex-col justify-center items-center border-b-2 pb-2">
            <div className="mb-2">
              <img
                src={user?.photoURL}
                alt="avatar"
                className="w-8 h-8 rounded-full inline mr-2 object-cover"
              />
              <span className=" dark:text-gray-300 text-gray-600 font-semibold">
                {user?.displayName}
              </span>
            </div>
            <button
              onClick={() => auth.signOut()}
              className="bg-main w-24 hover:bg-main-dark text-white px-3 rounded-lg">
              LogOut
            </button>
          </div>
          <input
            type="text"
            className="text-gray-600 bg-light border-b-2 border-gray-300 rounded-lg placeholder:text-sm h-8 px-2 my-4 focus:outline-none placeholder-config caret-slate-400 shadow-lg"
            placeholder="Search for friends"
            onChange={e => setInputValue(e.target.value)}
          />
          <div className="overflow-x-hidden h-3/5 scrollbar space-y-3">
            {userQuery.map(user => (
              <People
                userQuery={user}
                key={user.uid}
                onClick={() => handleSelect(user)}
                chatId={idRef.current}
                lastMessage={lastMessage}
              />
            ))}
          </div>
        </div>
      )}
      {isSelected && (
        <Messages
          currentUser={currentUser}
          chatId={idRef.current}
          handleLastMessage={handleLastMessage}
        />
      )}
      {!isSelected && (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-main font-bold text-3xl">Let's Make Friends</p>
          <BsChatQuote className="text-main text-3xl font-bold ml-4" />
        </div>
      )}
    </div>
  );
};
export default Home;
