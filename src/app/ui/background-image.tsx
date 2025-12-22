import Image from "next/legacy/image";

export const BackgroundImage = ({
  altText,
  imageSrc,
}: {
  altText: string;
  imageSrc: string;
}) => {
  return (
    <div className="fixed top-0 left-0 -z-10 h-full w-full">
      <Image
        alt={altText}
        src={imageSrc}
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/20 to-transparent"></div>
    </div>
  );
};
