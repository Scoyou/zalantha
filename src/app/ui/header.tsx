import Image from "next/image";
import React from "react";

export const Header = () => {
  return (
    <header className="relative w-full h-[40rem] overflow-hidden hero-background">
      <Image
        src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/logojpg_no_bg.png`}
        layout="fill"
        objectFit="contain"
        objectPosition="center"
        alt="Knights of Zalantha"
        priority
      />
    </header>
  );
};
