function Image(props) {
  const imgUrl = props.img;
  
  return (
    <div className="center-wrapper m-16">
      <div className="image-wrapper">
        <img className="image-1 border-4 rounded-3xl border-black h-[200px] w-[300px] md:h-[480px] md:w-[820px]  object-cover" alt="" src={imgUrl} />
        <img className="image-2 border-4 rounded-3xl border-black h-[200px] w-[300px] md:h-[480px] md:w-[820px]  object-cover" alt="" src={imgUrl} />
        <img className="image-3 border-4 rounded-3xl border-black h-[200px] w-[300px] md:h-[480px] md:w-[820px]  object-cover" alt="" src={imgUrl} />
        <img className="image-4 border-4 rounded-3xl border-black h-[200px] w-[300px] md:h-[480px] md:w-[820px]  object-cover" alt="" src={imgUrl} />
      </div>
    </div>
  );
}

export default Image;
