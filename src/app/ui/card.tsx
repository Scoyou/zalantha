import Link from "next/link";
import Image from "next/image";

const Card = ({
  imageUrl,
  title,
  subText,
  buttonText,
  buttonHref,
}: {
  imageUrl: string;
  title: string;
  subText: string;
  buttonText: string;
  buttonHref: string;
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-amber-100 border border-amber-600 p-4 m-4 relative">
      <div className="w-64 h-64 overflow-hidden">
        <Image
          className="absolute inset-0 w-full h-full transition-transform duration-300 transform hover:scale-110"
          src={imageUrl}
          alt="Card"
          layout="fill"
        />
      </div>
      <div className="px-6 py-4 relative z-10">
        <div className="bg-parchment bg-opacity-90 rounded p-4">
          <div className="font-serif font-bold text-xl mb-2 text-brown-800">
            {title}
          </div>
          <p className="text-gray-700 text-base mb-4">{subText}</p>
          <Link
            href={buttonHref}
            className="inline-block bg-amber-600 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
