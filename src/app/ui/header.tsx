import Image from "next/image";
import React from "react";

export const Header = () => {
  return (
    <header className="relative h-[38rem] w-full overflow-hidden hero-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,201,195,0.4),transparent_60%)]"></div>
      <Image
        src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/logojpg_no_bg.webp`}
        layout="fill"
        objectFit="contain"
        objectPosition="center"
        alt="Knights of Zalantha"
        priority
        loading="eager"
        className="drop-shadow-[0_30px_70px_rgba(90,64,52,0.35)]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/40 to-transparent"></div>
    </header>
  );
};
