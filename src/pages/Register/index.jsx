import { Link, useNavigate } from 'react-router-dom';
import { Input, LoadingSpinner } from '../../components';
import { addAvatar } from '../../assets';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { storage, auth } from '../../lib/firebase/firebase';
import useInput from '../../hooks/use-input';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import { TiTick } from 'react-icons/ti';
import { MAIL_REGEX, PASSWORD_REGEX } from '../../utils';
import { NAME_REGEX } from '../../utils/constants';
import Modal from '../../components/Modal';
import { createPortal } from 'react-dom';
import { handleSetDoc } from '../../lib/firebase/handle-firebase-data';

const Register = () => {
  const navigate = useNavigate();
  const {
    handleChangeInput: handleChangeName,
    handleBlurInput: handleBlurName,
    enteredValue: enteredName,
    hasError: hasErrorName,
    valueIsValid: nameIsValid,
  } = useInput(value => NAME_REGEX.test(value.trim()));

  const {
    handleChangeInput: handleChangeEmail,
    handleBlurInput: handleBlurEmail,
    enteredValue: enteredEmail,
    hasError: hasErrorEmail,
    valueIsValid: emailIsValid,
  } = useInput(value => MAIL_REGEX.test(value.trim()));
  const {
    handleChangeInput: handleChangePassword,
    handleBlurInput: handleBlurPassword,
    enteredValue: enteredPassword,
    hasError: hasErrorPassword,
    valueIsValid: passwordIsValid,
  } = useInput(value => PASSWORD_REGEX.test(value.trim()));

  const [file, setFile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formIsValid = emailIsValid && passwordIsValid && nameIsValid;

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );

      const { user } = userCredential;

      const storageRef = ref(storage, 'avatar/' + enteredName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        snapshot => {
          // Handle upload progress or other events if needed
        },
        error => {
          setError(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await updateProfile(user, {
            displayName: enteredName,
            photoURL: downloadURL,
          });

          const useData = {
            uid: user.uid,
            enteredName,
            enteredEmail,
            photoURL: downloadURL,
          };

          await handleSetDoc('users', user.uid, useData);
          await handleSetDoc('userChats', user.uid, {});
          navigate('/', { replace: true });
        }
      );
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="bg-white h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col gap-4 px-6 py-10 justify-center items-center bg-[#F7F7FF] rounded-xl">
          <h1 className="font-bold text-main text-4xl">Chatvia</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}>
            <Input
              type="text"
              id="name"
              onChange={handleChangeName}
              onBlur={handleBlurName}
              hasError={hasErrorName}
              value={enteredName}
              placeholder={hasErrorName ? 'Enter a valid name' : 'Your Name'}
            />
            <Input
              type="text"
              id="email"
              onChange={handleChangeEmail}
              onBlur={handleBlurEmail}
              hasError={hasErrorEmail}
              value={enteredEmail}
              placeholder={hasErrorEmail ? 'Enter a valid email' : 'Your Email'}
            />
            <Input
              type="password"
              id="password"
              onChange={handleChangePassword}
              onBlur={handleBlurPassword}
              hasError={hasErrorPassword}
              value={enteredPassword}
              placeholder={
                hasErrorPassword
                  ? 'Invalid Password (>8 contains a Digit and a Caps at least)'
                  : 'Your Password'
              }
            />
            <Input
              type="file"
              className="hidden"
              id="avatar"
              onChange={e => setFile(e.target.files[0])}
              accept=".jpg,.png,.jpeg"
              src={addAvatar}
              hasFile={!!file}
            />
            {file && (
              <div>
                <TiTick className="text-green-600 text-2xl inline" />
                <span className="text-green-600 text-sm">
                  Uploaded Succesfully
                </span>
              </div>
            )}
            <button
              disabled={!formIsValid || isLoading}
              className={`bg-main text-white w-full py-2 rounded-sm hover:bg-main-dark ${
                (!formIsValid || isLoading) &&
                'cursor-not-allowed bg-main-light hover:bg-main-light'
              }`}>
              Sign up
            </button>
          </form>
          <div className="mt-4">
            <span className="mr-2 font-medium text-gray-600">
              You already have an account?
            </span>
            <span>
              <Link
                to="/login"
                className="text-main hover:text-main-dark">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="absolute top-0 left-1/2 w-screen transform -translate-x-1/2 backdrop-blur-[2px]">
          <LoadingSpinner />
        </div>
      )}
      {error &&
        createPortal(
          <Modal
            title="Error"
            content={error?.message ?? 'Something Went Wrong'}
            onClick={() => setError(null)}
          />,
          document.getElementById('overlay')
        )}
    </>
  );
};
export default Register;
