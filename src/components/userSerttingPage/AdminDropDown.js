function AdminDropDown(props) {
  const { text, defaultValue, changeHandler } = props;

  const changeSelectHandler = (event) => {
    changeHandler(event.target.value);
  };

  return (
    <div className="border-1 border-cyan rounded-3xl px-4 py-2">
      <label htmlFor={text} className="text-xl text-black">
        {text}
      </label>
      <br />
      <br />
      <select
        name={text}
        id={text}
        className="w-full"
        onChange={changeSelectHandler}
        value={defaultValue}
      >
        <option value="1">1 (not recommended)</option>
        <option value="3">3</option>
        <option value="6">6</option>
        <option value="9">9</option>
        <option value="12">12</option>
      </select>
      <br />
      <br />
    </div>
  );
}

export default AdminDropDown;
