import Image from "next/image";
import React from "react";

export const Header = () => {
  return (
    <header className="relative w-full h-[40rem] overflow-hidden">
      <Image
        src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/header_image.webp`}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt="Knights of Zalantha"
        priority
      />
      <div className="flex items-center justify-center h-full w-full absolute top-0 left-0 bg-gray-900 bg-opacity-10 z-10">
        <div className="text-center">
          <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">
            Knights of Zalantha
          </h1>
        </div>
      </div>
    </header>
  );
};
