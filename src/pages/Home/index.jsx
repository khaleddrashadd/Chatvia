import { AiOutlineSetting } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { BiMoon } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import People from './People';
import Messages from './Messages';
import { auth, db } from '../../lib/firebase/firebase';
import { useAuth } from '../../hooks/use-auth';
import { useRef, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
const Home = () => {
  const { user } = useAuth();
  const [userQuery, setUserQuery] = useState([]);
  const inputRef = useRef();

  const handleSearch = () => {
    const userName = inputRef.current.value;
    if (userName) {
      const userRef = collection(db, 'users');
      // Our condition.
      const q = query(userRef, where('enteredName', '==', userName));
      const queryData = [];
      getDocs(q).then(querySnapshot => {
        querySnapshot.forEach(doc => {
          queryData.push(doc.data());
        });
        setUserQuery(queryData);
      });
    }
  };
  console.log(userQuery);
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col items-center gap-24 text-3xl bg-white w-12 my-4">
        <AiOutlineSetting />
        <BsPeople />
        <BiMoon />
        <BsSun />
      </div>
      {/** */}
      <div className="bg-lighter px-4 py-3 h-full">
        <h3 className="font-bold text-main text-center rounded-md text-3xl mb-4">
          Chatvia
        </h3>
        <div className="flex flex-col justify-center items-center border-b-2 pb-2">
          <div className="mb-2">
            <img
              src={user?.photoURL}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover inline mr-2"
            />
            <span className="font-semibold text-gray-600">
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
        />
        <div className="overflow-x-hidden h-3/5 scrollbar space-y-3">
          {userQuery.map(user => (
            <People
              userQuery={user}
              key={user.uid}
            />
          ))}
        </div>
      </div>
      <Messages />
      <div></div>
    </div>
  );
};
export default Home;
