import { useState } from "react";
export const useFormValidation = () => {

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const validateInputs = (username, password) => {
    let isValid = true;

    if (!password || password.length <= 4) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 5 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!username || username.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  return {
    passwordError,
    passwordErrorMessage,
    nameError,
    nameErrorMessage,
    validateInputs,
  };
};