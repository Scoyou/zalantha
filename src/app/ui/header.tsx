import Image from "next/image";
import React from "react";

export const Header = () => {
  return (
    <header className="relative h-[38rem] w-full overflow-hidden hero-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,194,123,0.35),transparent_55%)]"></div>
      <Image
        src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/logojpg_no_bg.webp`}
        layout="fill"
        objectFit="contain"
        objectPosition="center"
        alt="Knights of Zalantha"
        priority
        loading="eager"
        className="drop-shadow-[0_30px_70px_rgba(18,12,8,0.55)]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/50 to-transparent"></div>
    </header>
  );
};
