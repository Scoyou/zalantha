import Image from "next/image";
import mountains from "../public/mountains.jpg";

export const BackgroundImage = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <Image
      alt="Mountains"
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
