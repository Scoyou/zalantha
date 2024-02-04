import Image from "next/legacy/image";

export const BackgroundImage = ({
  altText,
  imageSrc,
}: {
  altText: string;
  imageSrc: string;
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Image
        alt={altText}
        src={imageSrc}
        layout="fill"
        objectFit="cover"
        priority
      />
    </div>
  );
};
