function SubmitButton(prop) {
  const { text, value, onClick} = prop;

  return (
    <>
      <div className="mt-8 flex justify-center text-lg text-black">
        <button
          type="button"
          name="intent"
          onClick={onClick}
          value={value}
          className="rounded-3xl bg-cyan bg-opacity-50 px-6 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
        >
          {text}
        </button>
      </div>
      <br />
    </>
  );
}

export default SubmitButton;
