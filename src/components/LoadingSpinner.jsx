import { RiLoader4Fill } from 'react-icons/ri';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <RiLoader4Fill className="w-24 h-24 text-orange-600 animate-spin" />
      <p className="text-orange-700 font-bold text-2xl">Loading...</p>
    </div>
  );
};
export default LoadingSpinner;
