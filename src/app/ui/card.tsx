"use client";

import Image from "next/legacy/image";
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
    <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-amber-100 border border-amber-600 p-4 my-4 relative h-[500px] md:w-[300px] w-11/12">
      <div className="w-full h-2/5 overflow-hidden">
        <Image
          className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
          src={imageUrl}
          alt="Card image"
          layout="fill"
        />
      </div>
      <div className="px-6 py-4 relative z-10 h-3/5">
        <div className="bg-parchment bg-opacity-90 rounded p-4 h-full flex flex-col justify-between">
          <div>
            <div className="font-serif font-bold text-xl mb-2 text-brown-800">
              {title}
            </div>
            <p className="text-gray-700 text-base">{subText}</p>
          </div>
          <button
            onClick={() => window.location.assign(buttonHref)}
            className="inline-block bg-amber-600 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
