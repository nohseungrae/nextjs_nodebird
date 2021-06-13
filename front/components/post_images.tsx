import { PlusOutlined } from "@ant-design/icons";
import React, { useCallback, useState } from "react";
import ImageZoom from "./imagesZoom";

interface IPostImagesProps {
  images: any;
}

const PostImages: React.FC<IPostImagesProps> = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  if (images.length === 1) {
    return (
      <>
        <img
          //굳이 누를 필요없다! 스크린 리더에게 알려주고 싶을 경우
          role="presentation"
          style={{ maxHeight: "200px" }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img
          //굳이 누를 필요없다! 스크린 리더에게 알려주고 싶을 경우
          role="presentation"
          style={{ width: "50%", display: "inline-block" }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          //굳이 누를 필요없다! 스크린 리더에게 알려주고 싶을 경우
          role="presentation"
          style={{ width: "50%", display: "inline-block" }}
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <img
          //굳이 누를 필요없다! 스크린 리더에게 알려주고 싶을 경우
          role="presentation"
          width="50%"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <div
          role="presentation"
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1} 개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
    </>
  );
};

export default PostImages;
