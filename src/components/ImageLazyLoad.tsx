import React, { useCallback, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderImg?: string;
  errorImg?: string;
}

export const ImageLazyLoad = ({
  src,
  placeholderImg,
  errorImg,
  ...props
}: ImageProps) => {
  const [imgSrc, setSrc] = useState(placeholderImg || src);
  const [onloading, setOnloading] = useState(false);

  const onLoad = useCallback(() => {
    setOnloading(true);
    setSrc(src);
  }, [src]);

  const onError = useCallback(() => {
    setSrc(errorImg || placeholderImg);
  }, [errorImg, placeholderImg]);

  useEffect(() => {
    const img = new Image();
    img.src = src as string;
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
    return () => {
      setOnloading(false);
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [src, onLoad, onError]);

  return onloading ? (
    <img {...props} alt={imgSrc} src={imgSrc} />
  ) : (
    <div className="imageLoadding">
      <ClipLoader color={'#f64e60'} loading={true} size={30} />
    </div>
  );
};

export default ImageLazyLoad;
