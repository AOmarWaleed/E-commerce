// import Style from './MainSlider.module.css';

import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="grid grid-cols-4 my-2 gap-2">
        <div className="col-span-3 row-span-2 overflow-hidden self-center">
          <Slider {...settings}>
            <img
              src="https://cdn.pixabay.com/photo/2014/08/26/21/48/shirts-428600_960_720.jpg"
              alt="Clothes shelf"
              className="w-full h-[400px] object-cover"
            />
            <img
              src="https://cdn.pixabay.com/photo/2017/01/17/03/57/desktop-1985856_960_720.jpg"
              alt="electronics"
              className="w-full h-[400px] object-cover"
            />
          </Slider>
        </div>
        <div>
          <img
            src="https://www.thepowdershampoo.com/cdn/shop/files/Group-new.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <img
            src="https://assets.cntraveller.in/photos/64475681c810805ead8e34aa/16:9/w_2112,h_1188,c_limit/GettyImages-1305078018.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
