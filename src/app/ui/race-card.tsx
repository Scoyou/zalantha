// components/CardComponent.js
import Image from "next/legacy/image";

function RaceCard({
  imageUrl,
  altText,
  title,
  content,
  invertedImagePos = false,
}: {
  imageUrl: string;
  altText: string;
  title: string;
  content: string;
  invertedImagePos?: boolean;
}) {
  const containerClasses = `flex flex-col ${invertedImagePos ? "md:flex-row-reverse" : "md:flex-row"} bg-white shadow-lg rounded-lg overflow-hidden border-b-2 md:mt-1 mt-4`;

  return (
    <div className={containerClasses}>
      <div className="md:flex-shrink-0 md:w-1/4 ">
        <Image
          src={imageUrl}
          alt={altText}
          width={200}
          height={200}
          layout="responsive"
          objectFit="cover"
        />
      </div>

      <div className="p-4 md:w-3/4 bg-lightParchment">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2 text-gray-600">{content}</p>
      </div>
    </div>
  );
}

export default RaceCard;
