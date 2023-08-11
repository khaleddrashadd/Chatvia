import { useState } from 'react';

const useInput = (validateValue) => {
  const [isTouched, setIsTouched] = useState(false);

  const [enteredValue, setEnteredValue] = useState('');

  const valueIsValid = validateValue(enteredValue);

  const hasError = !valueIsValid && isTouched;

  const handleChangeInput = event => {
    setEnteredValue(event.target.value);
  };
  const handleBlurInput = () => {
    setIsTouched(true);
  };
  

  return { handleChangeInput, handleBlurInput, enteredValue, hasError,valueIsValid };
};
export default useInput;
