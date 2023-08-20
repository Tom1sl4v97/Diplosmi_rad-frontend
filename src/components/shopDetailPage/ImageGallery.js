import { Carousel } from "flowbite-react";

function ImageGallery(props) {
  const { imageList } = props;
  return (
    <Carousel>
      {imageList.map((image, index) => (
        <img key={index} alt={"image" + index} src={image} className=" h-full object-contain"/>
      ))}
    </Carousel>
  );
}

export default ImageGallery;
