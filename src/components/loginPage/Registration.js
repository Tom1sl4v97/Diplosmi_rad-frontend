import { useTranslation } from "react-i18next";

import Title from "./Title";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

function Registration() {
    const { t: text, i18n } = useTranslation();

    return (
        <>
            <div className="flex h-screen w-full mb-4 items-center justify-center bg-cover bg-no-repeat loginBackground">
                <div className="rounded-3xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                    <div className="text-white">
                        <Title title={text("homePageTitle")} subTitle={text("registrationLabel")} />

                        <form action="#">
                            <InputField type="text" name="username" placeholder="E-mail" />

                            <InputField type="password" name="password" placeholder={text("loginPassword")} />

                            <SubmitButton text={text("login")} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration;