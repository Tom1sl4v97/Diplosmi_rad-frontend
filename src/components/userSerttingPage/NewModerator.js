import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSessionStorage, defaultSession } from "../../hooks/SessionStorage";

import InputField from "./InputField";
import SubmitButton from "../loginPage/SubmitButton";
import { useAddModerator } from "../../hooks/fetchContent";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function NewModerator() {
  const { t: text } = useTranslation();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");

  const [userData, setUserData] = useSessionStorage("userData", defaultSession);
  const [success, setSuccess] = useState(false);

  const { setEmailContentful, addModerator, errorContentful } = useAddModerator();

  const emailHandler = (event) => {
    setSuccess(false);
    setEmail(event.target.value);
  };

  const submitHandler = async () => {
    if (!email.includes("@") || !email.includes(".com") || email.length < 5) {
      setError("Email is not valid");
      return;
    }

    setError(false);

    const url = `${serverUrl}/newModerator`;

    const body = {
      email: email,
    };

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.tokenKey}`,
      },
    });

    if (response.status !== 200) {
      setError("Email is not valid");
      return;
    }

    setEmailContentful(email);
    addModerator();

    setSuccess(true);
    setError(false);
    setEmail("");
  };

  return (
    <div className="w-full flex justify-center">
      <form className="w-[1000px]">
        <InputField
          label={text("pageSettingsNewModeratorEmail")}
          name={email}
          onChange={emailHandler}
          color="gray-700"
          htmlFor="email"
          type="text"
        />

        {error !== null && (
          <div className="flex justify-center text-red">{error}</div>
        )}

        {success && (
          <div className="flex justify-center text-cyanDark">
            {text("pageSettingsSuccessNewModerator")}
          </div>
        )}

        <div className="">
          <SubmitButton
            text={"Save"}
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

export default NewModerator;
