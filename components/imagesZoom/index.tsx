import React, { MouseEvent, useState } from "react";
import Slick from "react-slick";
import {
  CloseBtn,
  Global,
  Indicator,
  Overlay,
  SlickWrapper,
  ImgWrapper,
  Header,
} from "./styles";

interface IImageZoomProps {
  images: any[];
  onClose: any;
}

const ImageZoom: React.FC<IImageZoomProps> = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose} />
      </Header>
      <SlickWrapper>
        <Global />
        <div>
          <Slick
            initialSlide={0}
            beforeChange={(slide: number) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((image) => (
              <ImgWrapper key={image.src}>
                <img src={image.src} alt={image.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1}/{images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

export default ImageZoom;
