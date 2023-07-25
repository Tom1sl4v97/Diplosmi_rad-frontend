import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../config/Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSessionStorage, defaultSession } from "../../hooks/SessionStorage";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/Auth";

import Title from "./Title";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import Divider from "./Divider";
import GoogleButton from "./GoogleButton";
import useInput from "../../hooks/use-input";

function Login(props) {
  const { t: text } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const [userSession, setUserSession] = useSessionStorage(
    "userData",
    defaultSession()
  );

  useEffect(() => {
    if (userSession.role === "user") {
      navigate("/", { replace: true });
    }
  }, [userSession]);

  const dontHaveAccount = (
    <div className="flex justify-center">
      <NavLink
        to="/registration"
        className="text-white text-sm font-bold hover:underline"
      >
        {text("loginNoAccount")}
      </NavLink>
    </div>
  );

  const onChangeEmailHandler = (val) => {
    emailChangedHandler(val);
  };

  const onChangePasswordHandler = (val) => {
    passwordChangedHandler(val);
  };

  const successfullLogin = async (userData) => {
    const token = await userData.user.getIdToken();

    const url = "http://localhost:5050/api/users";
    let headers = new Headers();

    headers.append("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
    headers.append("Access-Control-Allow-Methods", "POST");
    headers.append(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    headers.append("authtoken", token);

    // const response = await fetch(url, {
    //   method: "GET",
    //   headers: headers,
    // });

    const user = {
      username: userData.user.displayName,
      email: userData.user.email,
      image: "https://img.icons8.com/?size=512&id=0lg0kb05hrOz&format=png",
    };

    setUserSession({
      role: "user",
      user: user,
      tokenKey: token,
      dateTimeStamp: new Date().getTime(),
    });

    dispatch(authActions.login());

    resetEmailInput();
    resetPasswordInput();
  };

  useEffect(() => {
    setError(null);
  }, [text]);

  const signInHandler = async () => {
    const validation = checkValidation();

    if (!validation) return;

    try {
      const userData = await signInWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      await successfullLogin(userData);
    } catch (err) {
      errorHandler(err);
    }
  };

  const checkValidation = () => {
    var validation = true;
    if (enteredEmail.trim() === "" && enteredPassword.trim() === "") {
      setError(text("userLoginEmailAndPasswordIsEmtpy"));
      validation = false;
    } else if (enteredEmail.trim() === "" || emailInputHasError) {
      setError(text("userLoginEmailIsEmtpy"));
      validation = false;
    } else if (enteredPassword.trim() === "") {
      setError(text("userLoginPasswordIsEmpty"));
      validation = false;
    }
    return validation;
  };

  const signInWithPopupHandler = async () => {
    try {
      const userData = await signInWithPopup(auth, googleProvider);
      await successfullLogin(userData);
    } catch (err) {
      errorHandler(err);
    }
  };

  const errorHandler = (err) => {
    if (err.code === "auth/user-not-found") {
      setError(text("userNotFound"));
    }
    if (err.code === "auth/wrong-password") {
      setError(text("userWrongPassword"));
    } else {
      setError(text("userLoginUnknownError"));
    }
  };

  return (
    <div className="flex h-screen w-full mb-4 items-center justify-center bg-cover bg-no-repeat loginBackground">
      <div className="rounded-3xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <Title title={text("homePageTitle")} subTitle={text("loginLabel")} />

          <form>
            {error && (
              <div className="text-red-500 text-center mb-4 w-72 text-lightRed line-clamp-3">
                {error}
              </div>
            )}

            <InputField
              type="text"
              name="e-mail"
              forInput="e-mail"
              placeholder="E-mail"
              error={emailInputHasError}
              onChange={onChangeEmailHandler}
              onBlur={emailBlurHandler}
            />

            <InputField
              type="password"
              name="password"
              forInput="password"
              placeholder={text("loginPassword")}
              error={passwordInputHasError}
              onChange={onChangePasswordHandler}
              onBlur={passwordBlurHandler}
            />

            <SubmitButton
              text={text("login")}
              value={"signIn"}
              onClick={signInHandler}
            />

            <Divider />

            <GoogleButton
              text={text("signupWithGoogle")}
              value={"signInWithGoogle"}
              onClick={signInWithPopupHandler}
            />

            {dontHaveAccount}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
