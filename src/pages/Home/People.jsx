import { addAvatar } from '../../assets';

const People = ({ userQuery }) => {
  return (
    // <div className="overflow-x-hidden h-3/5 scrollbar">
      <div className="flex items-center cursor-pointer hover:bg-light rounded-sm duration-300">
        <img
          src={userQuery?.photoURL}
          alt="avatar"
          className="block mr-2 w-10 h-10 rounded-[50%]"
        />
        <div className="flex flex-col">
          <span className="block font-semibold text-grey-500">
            {userQuery?.enteredName}
          </span>
          <span className="block text-gray-400 text-sm">okey thank you</span>
        </div>
      </div>
      );
};
export default People;
