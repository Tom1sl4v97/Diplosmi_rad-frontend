import logoUrl from '../../assets/images/logo.png';
import { useTranslation } from 'react-i18next';

function DrugaStranica() {

    const { t: text, i18n } = useTranslation();

    const inputConteiner = (type, name, placeholder) => {
        return <input className="rounded-3xl border-none bg-cyan bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
            type={type}
            name={name}
            placeholder={placeholder} />

    }


    return (

        <div className="flex h-screen w-full mb-4 items-center justify-center bg-cover bg-no-repeat loginBackground">
            <div className="rounded-3xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                <div className="text-white">
                    <div className="mb-8 flex flex-col items-center">
                        <img src={logoUrl} className="mb-2" width="150" alt="logo" srcset="" />
                        <h1 className="mb-2 text-2xl">{text("homePageTitle")}</h1>
                        <span className="text-gray-300">{text("loginLabel")} </span>
                    </div>

                    <form action="#">
                        <div className="mb-4 text-lg">
                            {inputConteiner("text", "username", "E-mail")}
                        </div>

                        <div className="mb-4 text-lg">
                            {inputConteiner("password", "password", text("loginPassword"))}
                        </div>
                        <div className="mt-8 flex justify-center text-lg text-black">
                            <button type="submit" className="rounded-3xl bg-cyan bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">{text("login")}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DrugaStranica;
