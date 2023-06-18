import { AiOutlineSetting } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { BiMoon } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import { addAvatar } from '../../assets';
import People from './People';
import Messages from './Messages';
import { auth } from '../../lib/firebase/firebase';

const Home = () => {
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
              src={addAvatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover inline mr-2"
            />
            <span className="font-semibold text-gray-600">Khaled</span>
          </div>
          <button onClick={()=>auth.signOut()} className="bg-main w-24 hover:bg-main-dark text-white px-3 rounded-lg">
            LogOut
          </button>
        </div>
        <input
          type="text"
          className="text-gray-600 bg-light border-b-2 border-gray-300 rounded-lg placeholder:text-sm h-8 px-2 my-4 focus:outline-none placeholder-config caret-slate-400 shadow-lg"
          placeholder="Search for friends"
        />
        <People />
      </div>
      <Messages/>
      <div></div>
    </div>
  );
};
export default Home;
