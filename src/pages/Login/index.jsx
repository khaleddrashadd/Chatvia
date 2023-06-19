import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components';
import useInput from '../../hooks/use-input';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase/firebase';
import { MAIL_REGEX, PASSWORD_REGEX } from '../../utils';


const Register = () => {
  const navigate = useNavigate();

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

  const handleSubmit = e => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // ...
        navigate('/', { replace: true });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const formIsValid = emailIsValid && passwordIsValid;

  return (
    <div className="bg-white h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 px-6 py-10 justify-center items-center bg-[#F7F7FF] rounded-xl">
        <h1 className="font-bold text-main text-4xl">Chatvia</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}>
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
          <button
            disabled={!formIsValid}
            className={`bg-main text-white w-full py-2 rounded-sm hover:bg-main-dark ${
              !formIsValid &&
              'cursor-not-allowed bg-main-light hover:bg-main-light'
            }`}>
            Sign in
          </button>
        </form>
        <div className="mt-4">
          <span className="mr-2 font-medium text-gray-600">
            You don't have an account yet?
          </span>
          <span>
            <Link
              to="/register"
              className="text-main hover:text-main-dark">
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Register;
