function SubmitButton(prop) {
    const text = prop.text;

    return (
        <div className="mt-8 flex justify-center text-lg text-black">
            <button type="submit" className="rounded-3xl bg-cyan bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">{text}</button>
        </div>
    )
}

export default SubmitButton;