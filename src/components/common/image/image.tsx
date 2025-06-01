import { Image, ImageProps } from "primereact/image";
import { useState } from "react";

const SmartImage = ({
  src,
  fallback,
  rest,
}: {
  src: string;
  fallback: string;
  rest: ImageProps;
}) => {
  const [error, setError] = useState(false);

  return (
    <Image
      src={error || !src ? fallback : src}
      onError={() => setError(true)}
      alt={rest.alt}
      {...rest}
    />
  );
};

export default SmartImage;
