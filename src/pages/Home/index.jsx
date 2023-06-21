import { AiOutlineSetting } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { BiMoon } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import People from './People';
import Messages from './Messages';
import { auth, db } from '../../lib/firebase/firebase';
import { useAuth } from '../../hooks/use-auth';
import { useCallback, useRef, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import useTheme from '../../hooks/use-theme';
const Home = () => {
  const { user } = useAuth();
  const [userQuery, setUserQuery] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [lastMessage, setLastMessage] = useState('');
  const [isListOpen, setIsListOpen] = useState(false);
  const inputRef = useRef();
  const idRef = useRef();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSearch = event => {
    if (event.key !== 'Enter') return;
    const userName = inputRef.current.value;
    if (!userName) return;
    const userRef = collection(db, 'users');
    // Our condition.
    const q = query(userRef, where('enteredName', '==', userName));
    const queryData = [];
    getDocs(q)
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          queryData.push(doc.data());
        });
        setUserQuery(queryData);
      })
      .catch(err => {
        console.log(err);
      });
  };
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
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

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

  return (
    <div
      className={`flex h-screen overflow-hidden  ${
        isDarkMode ? 'bg-dark' : 'bg-white'
      }`}>
      <div
        className={`flex flex-col items-center gap-24 text-3xl ${
          isDarkMode ? 'bg-darker text-white' : 'bg-white text-black'
        }  w-12 py-4`}>
        <BsPeople
          onClick={handleToggleFriend}
          className={`cursor-pointer ${
            isListOpen && 'text-main'
          } hover:text-main-dark`}
        />
        {isDarkMode ? (
          <BsSun
            onClick={() => toggleTheme(false)}
            className={`cursor-pointer hover:text-main-dark`}
          />
        ) : (
          <BiMoon
            onClick={() => toggleTheme(true)}
            className={`cursor-pointer hover:text-main-dark`}
          />
        )}
      </div>
      {isListOpen && (
        <div
          className={`${
            isDarkMode ? 'bg-darkest' : 'bg-lighter'
          } px-4 py-3 h-full`}>
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
              <span
                className={`font-semibold ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
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
            ref={inputRef}
            onKeyDown={handleSearch}
            onTouchStart={handleSearch}
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
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};
export default Home;
