function InputField(props) {
    const { type, name, forInput, placeholder } = props;

    return (
        <div className="mb-4 text-lg">
            <input className="w-full rounded-3xl border-none bg-cyan bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                type={type}
                name={name}
                htmlFor={forInput}
            placeholder={placeholder} />
        </div>
    )

}

export default InputField;