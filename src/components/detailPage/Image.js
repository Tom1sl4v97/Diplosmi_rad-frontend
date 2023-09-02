function Image(props) {
  const imgUrl = props.img;

  return (
    <div className="image-wrapper mt-12 lg:mt-16">
      <img
        className="image-1 border-4 rounded-3xl border-black h-[200px] w-[300px] lg:h-[480px] lg:w-[820px]  object-cover"
        alt=""
        src={imgUrl}
      />
      <img
        className="image-2 border-4 rounded-3xl border-black h-[200px] w-[300px] lg:h-[480px] lg:w-[820px]  object-cover"
        alt=""
        src={imgUrl}
      />
      <img
        className="image-3 border-4 rounded-3xl border-black h-[200px] w-[300px] lg:h-[480px] lg:w-[820px]  object-cover"
        alt=""
        src={imgUrl}
      />
      <img
        className="image-4 border-4 rounded-3xl border-black h-[200px] w-[300px] lg:h-[480px] lg:w-[820px]  object-cover"
        alt=""
        src={imgUrl}
      />
    </div>
  );
}

export default Image;
