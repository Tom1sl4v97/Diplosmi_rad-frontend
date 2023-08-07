import { useTranslation } from "react-i18next";
import { useSessionStorage, defaultSession } from "../../hooks/SessionStorage";
import InputField from "./InputField";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import SubmitButton from "../loginPage/SubmitButton";

const serverURL = process.env.REACT_APP_SERVER_URL;

function UserData() {
  const { t: text } = useTranslation();
  const [session, setSession] = useSessionStorage("userData", defaultSession);
  const [firstName, setFirstName] = useState(session.user.firstName ?? "");
  const [lastName, setLastName] = useState(session.user.lastName ?? "");
  const [phoneNumber, setPhoneNumber] = useState(
    session.user.phoneNumber ?? ""
  );
  const [username, setUsername] = useState(session.user.username ?? "");
  const [birthDate, setBirthDate] = useState({
    startDate: session.user.birthDate ?? "",
    endDate: session.user.birthDate ?? "",
  });

  const [adress, setAdress] = useState(session.user.adress ?? "");
  const [city, setCity] = useState(session.user.city ?? "");
  const [country, setCountry] = useState(session.user.country ?? "");
  const [postalCode, setPostalCode] = useState(session.user.postalCode ?? "");

  const [error, setError] = useState(null);

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const phoneNumberHandler = (event) => {
    setPhoneNumber(event.target.value);
  };

  const usernameHandler = (event) => {
    if (event.target.value === "") setError(true);
    else setError(false);
    setUsername(event.target.value);
  };

  const birthDateHandler = (newBirthDate) => {
    setBirthDate(newBirthDate);
  };

  const adressHandler = (event) => {
    setAdress(event.target.value);
  };

  const cityHandler = (event) => {
    setCity(event.target.value);
  };

  const countryHandler = (event) => {
    setCountry(event.target.value);
  };

  const postalCodeHandler = (event) => {
    setPostalCode(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (error) return;

    updateUserProfile();
    setUserSession();

    window.location.reload();
  };

  const updateUserProfile = async () => {
    const body = {};

    if (firstName !== "") body.firstName = firstName;
    if (lastName !== "") body.lastName = lastName;
    if (phoneNumber !== "") body.phoneNumber = phoneNumber;
    if (birthDate.startDate !== "") body.birthDate = {
      startDate: birthDate.startDate,
      endDate: birthDate.endDate,
    }
    if (adress !== "") body.adress = adress;
    if (city !== "") body.city = city;
    if (country !== "") body.country = country;
    if (postalCode !== "") body.postalCode = postalCode;

    body.userName = username;
    body.email = session.user.email;

    const response = await fetch(serverURL + "/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.tokenKey,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.error) {
      setError(data.error);
      return;
    }
  };

  const setUserSession = () => {
    setSession({
      ...session,
      user: {
        ...session.user,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        username: username,
        birthDate: birthDate.startDate,
        adress: adress,
        city: city,
        country: country,
        postalCode: postalCode,
      },
    });
  };

  return (
    <div className="w-full flex justify-center">
      <form className="w-[800px]">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputField
              label={text("signupFirstName")}
              name={firstName}
              onChange={firstNameHandler}
              color="cyan"
              htmlFor="firstName"
              type="text"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <InputField
              label={text("signupLastName")}
              name={lastName}
              onChange={lastNameHandler}
              color="gray-700"
              htmlFor="lastName"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <InputField
              label={text("signupUsername")}
              name={username}
              onChange={usernameHandler}
              color="gray-700"
              htmlFor="username"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputField
              label={text("signupMobileNumber")}
              name={phoneNumber}
              onChange={phoneNumberHandler}
              color="gray-700"
              htmlFor="phoneNumber"
              type="text"
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label className="text-cyan block uppercase tracking-wide text-xl font-bold mb-3">
              {text("signupBirthDate")}
            </label>
            <Datepicker
              displayFormat="DD.MM.YYYY"
              placeholder={text("signupBirthDate")}
              useRange={false}
              asSingle={true}
              value={birthDate}
              onChange={birthDateHandler}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <InputField
              label={text("userSettingsAdress")}
              name={adress}
              onChange={adressHandler}
              color="cyan"
              htmlFor="adress"
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <InputField
              label={text("userSettingsPostalCode")}
              name={postalCode}
              onChange={postalCodeHandler}
              color="cyan"
              htmlFor="postalCode"
              type="text"
            />
          </div>

          <div className="w-full md:w-1/3 px-3">
          <InputField
              label={text("userSettingsCity")}
              name={city}
              onChange={cityHandler}
              color="gray-700"
              htmlFor="city"
              type="text"
            />
          </div>

          <div className="w-full md:w-1/3 px-3">
          <InputField
              label={text("userSettingsCountry")}
              name={country}
              onChange={countryHandler}
              color="cyan"
              htmlFor="country"
              type="text"
            />
          </div>
        </div>

        {error && (
          <div className="flex justify-center text-red">
            {text("userRegistrationUsernameIsEmpty")}
          </div>
        )}

        <div className="">
          <SubmitButton
            text={text("saveSettings")}
            value="save"
            onClick={submitHandler}
            color="black"
          />
        </div>

        <br />
        <br />
        <br />
      </form>
    </div>
  );
}

export default UserData;
