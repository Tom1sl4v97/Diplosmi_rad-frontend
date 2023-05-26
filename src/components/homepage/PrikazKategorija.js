function PrvaSlikaKategirije(props) {
  const style =
    "mx-1 mb-2 px-2 border-solid border-2 rounded-full" +
    (props.hover ? " group-hover:border-black" : "");
  return <p className={style}>{props.category}</p>;
}

export default PrvaSlikaKategirije;
