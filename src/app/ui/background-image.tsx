import Image from "next/image";
import mountains from "../public/mountains.jpg";

export const BackgroundImage = ({
  altText,
  imageSrc,
}: {
  altText: string;
  imageSrc: string;
}) => {
  return (
    <Image
      alt={altText}
      src={imageSrc}
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: "cover",
        zIndex: -1,
      }}
      priority
    />
  );
};
