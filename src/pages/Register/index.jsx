import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components';
import { addAvatar } from '../../assets';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { storage, auth, db } from '../../lib/firebase/firebase';
import useInput from '../../hooks/use-input';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { TiTick } from 'react-icons/ti';
import { MAIL_REGEX, PASSWORD_REGEX } from '../../utils';
import { NAME_REGEX } from '../../utils/constants';

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

  const formIsValid = emailIsValid && passwordIsValid && nameIsValid;

  const handleSubmit = e => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then(userCredential => {
        const user = userCredential.user;

        const storageRef = ref(storage, enteredName);

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          error => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async downloadURL => {
                try {
                  await updateProfile(user, {
                    displayName: enteredName,
                    photoURL: downloadURL,
                  });
                  await setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    enteredName,
                    enteredEmail,
                    photoURL: downloadURL,
                  });
                  console.log(user);
                  await setDoc(doc(db, 'userChats', user.uid), {});

                  navigate('/', { replace: true });
                } catch (err) {
                  console.log(err);
                }
              })
              .catch(err => console.log(err));
          }
        );
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
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
            disabled={!formIsValid}
            className={`bg-main text-white w-full py-2 rounded-sm hover:bg-main-dark ${
              !formIsValid &&
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
  );
};
export default Register;
