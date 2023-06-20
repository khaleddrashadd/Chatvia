import useTheme from '../../hooks/use-theme';

const People = ({ userQuery, onClick, lastMessage }) => {
  const { isDarkMode } = useTheme();

  console.log('💥 ~ People ~ lastMessage', lastMessage);

  return (
    // <div className="overflow-x-hidden h-3/5 scrollbar">
    <div
      className={`flex items-center cursor-pointer ${
        isDarkMode ? 'bg-light text-black' : 'bg-light text-black'
      } hover:bg-main hover:text-white duration-300 rounded-lg`}
      onClick={onClick}>
      <img
        src={userQuery?.photoURL}
        alt="avatar"
        className="block mr-2 w-10 h-10 rounded-[50%] object-cover"
      />
      <div className="flex flex-col">
        <span className="block font-semibold text-grey-500">
          {userQuery?.enteredName}
        </span>
        <span className="block text-gray-400 text-sm">{lastMessage}</span>
      </div>
    </div>
  );
};
export default People;
