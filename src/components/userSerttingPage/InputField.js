function InputFieldLevi(props) {
  const { label, name, onChange, color, htmlFor, type } = props;

  var placeholder;

  switch (htmlFor) {
    case "firstName":
      placeholder = "Example: John";
      break;
    case "lastName":
      placeholder = "Example: Doe";
      break;
    case "username":
      placeholder = "Example: johndoe";
      break;
    case "phoneNumber":
      placeholder = "Example: 081234567890";
      break;
    case "email":
      placeholder = "Example: Jhon1995@gmail.com";
      break;
    default:
      placeholder = "Example: John";
  }

  const labelCSS =
    "text-" + color + " block uppercase tracking-wide text-xl font-bold mb-2";
  const inputCSS =
    "appearance-none block w-full bg-gray-200 text-gray-700 border-2 border-" +
    color +
    " rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

  return (
    <>
      <label className={labelCSS} htmlFor={htmlFor}>
        {label}
      </label>
      <input
        className={inputCSS}
        id={htmlFor}
        type={type}
        placeholder={placeholder}
        value={name}
        onChange={onChange}
      />
    </>
  );
}

export default InputFieldLevi;
