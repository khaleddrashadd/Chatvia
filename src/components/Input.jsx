import { addAvatar } from '../assets';

const Input = ({
  type,
  placeholder,
  className,
  accept,
  src,
  onChange,
  onBlur,
  hasError,value,id
}) => {

  return (
    <>
      <label
        htmlFor={id}
        className={`${!className && 'sr-only'}`}>
        {className ? (
          <>
            <img
              src={src}
              alt="avatar-input"
              className="w-10 h-10 cursor-pointer inline mr-4"
            />
            <span className="text-gray-400">Add an avatar</span>
          </>
        ) : (
          placeholder
        )}
      </label>
      <input
        id={id}
        className={`border-gray-300 rounded-md w-80 h-12 px-2 focus:outline-main placeholder-config caret-slate-400 ${
          className && className
        } ${hasError && 'bg-red-200 border-red-500 focus:outline-red-400 placeholder:text-red-600'}`}
        type={type}
        placeholder={placeholder}
        accept={accept}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </>
  );
};
export default Input;
