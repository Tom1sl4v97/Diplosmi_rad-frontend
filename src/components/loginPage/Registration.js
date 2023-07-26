import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSessionStorage, defaultSession } from "../../hooks/SessionStorage";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/Auth";
import Datepicker from "react-tailwindcss-datepicker";

import Title from "./Title";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import useInput from "../../hooks/use-input";

const serverURL = "http://localhost:5050/api";

function Registration() {
  const { t: text } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [birthDate, setBirthDate] = useState(null);

  const handleValueChange = (newValue) => {
    setBirthDate(newValue);
  };

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));

  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangedHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangedHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const [userSession, setUserSession] = useSessionStorage(
    "userData",
    defaultSession()
  );

  useEffect(() => {
    if (userSession.role === "user") {
      navigate("/", { replace: true });
    }
  }, [userSession, navigate]);

  const onChangeEmailHandler = (event) => {
    emailChangedHandler(event);
  };

  const onChangeUsernameHandler = (event) => {
    usernameChangedHandler(event);
  };

  const onChangePasswordHandler = (event) => {
    passwordChangedHandler(event);
  };

  const onChangeConfirmPasswordHandler = (event) => {
    confirmPasswordChangedHandler(event);
  };

  const onChangeFirstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const onChangeLastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const onChangeMobileNumberHandler = (event) => {
    setMobileNumber(event.target.value);
  };

  useEffect(() => {
    setError(null);
  }, [text]);

  const createNewUserHandler = async () => {
    const validation = validateUserInputs();
    if (validation) return;

    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );

      await successfullRegistration(userData);
    } catch (error) {
      firebaseErrorHandler(error);
    }
  };

  const firebaseErrorHandler = (error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    if (errorCode === "auth/email-already-in-use") {
      setError([text("userRegistrationEmailIsAlreadyInUse")]);
    } else if (errorCode === "auth/invalid-email") {
      setError([text("userRegistrationEmailIsInvalid")]);
    } else if (errorCode === "auth/weak-password") {
      setError([text("userRegistrationPasswordIsWeak")]);
    } else {
      setError([errorMessage]);
    }
  };

  const successfullRegistration = async (userData) => {
    const user = {
      userName: enteredUsername,
      email: enteredEmail,
      image: null,
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      phoneNumber: mobileNumber,
    };
    const token = await userData.user.getIdToken();

    try {
      await createNewUserInDB(user, token);
    } catch (error) {
      setError([error.message]);
      return;
    }

    setUserSession({
      role: "user",
      user: user,
      tokenKey: token,
      dateTimeStamp: new Date().getTime(),
    });
    dispatch(authActions.login());

    resetEmailInput();
    resetUsernameInput();
    resetPasswordInput();
    resetConfirmPasswordInput();
    setFirstName("");
    setLastName("");
    setBirthDate("");
    setMobileNumber("");
    setError(null);
  };

  async function createNewUserInDB(userData, token) {
    const serverUrl = serverURL + "/users";

    let headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(serverUrl, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }
    } catch (error) {
      throw new Error("Failed to connect to the server");
    }
  }

  const validateUserInputs = () => {
    var errorList = [];
    var validation = false;

    if (enteredEmail === "") {
      errorList.push(text("userRegistrationEmailIsEmtpy"));
      validation = true;
    }

    if (!enteredEmailIsValid) {
      errorList.push(text("userRegistrationEmailIsInvalid"));
      validation = true;
    }

    if (enteredUsername === "" || !enteredUsernameIsValid) {
      errorList.push(text("userRegistrationUsernameIsEmpty"));
      validation = true;
    }

    if (enteredPassword === "" || !enteredPasswordIsValid) {
      errorList.push(text("userRegistrationPasswordIsEmtpy"));
      validation = true;
    }
    if (enteredConfirmPassword === "" || !enteredConfirmPasswordIsValid) {
      errorList.push(text("userRegistrationPasswordConfirmIsEmtpy"));
      validation = true;
    }
    if (enteredPassword !== enteredConfirmPassword) {
      errorList.push(text("userRegistrationPasswordsDoNotMatch"));
      validation = true;
    }

    if (emailInputHasError) {
      errorList.push(text("userRegistrationEmailIsInvalid"));
      validation = true;
    }

    setError(errorList);
    return validation;
  };

  const backToLogin = (
    <div className="flex justify-center pt-12">
      <NavLink
        to="/login"
        className="text-white text-sm font-bold hover:underline"
      >
        {text("signupCancel")}
      </NavLink>
    </div>
  );

  return (
    <>
      <div className="flex h-[68rem] w-full mb-4 items-center justify-center bg-cover bg-no-repeat loginBackground ">
        <div className="rounded-3xl bg-gray-800 bg-opacity-50 px-16 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <Title
              title={text("homePageTitle")}
              subTitle={text("registrationLabel")}
            />

            {error && (
              <div className="text-red-500 text-center text-lightRed">
                {Array.isArray(error) &&
                  error.map((err, index) => <p key={index}>{err}</p>)}
                <br />
              </div>
            )}

            <form action="#">
              <InputField
                type="text"
                name="username"
                forinput="username"
                placeholder="E-mail *"
                error={emailInputHasError}
                onChange={onChangeEmailHandler}
                onBlur={emailBlurHandler}
              />

              <InputField
                type="text"
                name="username"
                forinput="username"
                placeholder="Username *"
                error={usernameInputHasError}
                onChange={onChangeUsernameHandler}
                onBlur={usernameBlurHandler}
              />

              <InputField
                type="password"
                name="password"
                forinput="password"
                placeholder={text("loginPassword") + " *"}
                error={passwordInputHasError}
                onChange={onChangePasswordHandler}
                onBlur={passwordBlurHandler}
              />

              <InputField
                type="password"
                name="confirmPassword"
                forinput="confirmPassword"
                placeholder={text("signupConfirmPassword") + " *"}
                error={confirmPasswordInputHasError}
                onChange={onChangeConfirmPasswordHandler}
                onBlur={confirmPasswordBlurHandler}
              />

              <br />
              <br />

              <InputField
                type="text"
                name="firstName"
                forinput="firstName"
                placeholder={text("signupFirstName")}
                onChange={onChangeFirstNameHandler}
              />

              <InputField
                type="text"
                name="lastName"
                placeholder={text("signupLastName")}
                onChange={onChangeLastNameHandler}
              />

              <Datepicker
                displayFormat="DD.MM.YYYY"
                placeholder={text("signupBirthDate")}
                useRange={false}
                asSingle={true}
                value={birthDate}
                onChange={handleValueChange}
              />

              <br />

              <InputField
                type="text"
                name="mobileNumber"
                placeholder={text("signupMobileNumber")}
                onChange={onChangeMobileNumberHandler}
              />

              <div className="flex flex-row justify-between">
                <SubmitButton
                  text={text("loginSignup")}
                  value="createNewAcc"
                  onClick={createNewUserHandler}
                />

                {backToLogin}
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
