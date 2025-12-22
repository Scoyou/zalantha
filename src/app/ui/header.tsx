import Image from "next/image";
import React from "react";

export const Header = () => {
  return (
    <header className="relative h-screen w-full overflow-hidden hero-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,247,239,0.65),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(217,163,155,0.55),transparent_55%)]"></div>
      <div className="absolute inset-6 rounded-[36px] border border-white/40 shadow-[0_0_60px_rgba(217,163,155,0.25)] md:inset-10"></div>
      <Image
        src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/logojpg_no_bg.webp`}
        layout="fill"
        objectFit="contain"
        objectPosition="center"
        alt="Knights of Zalantha"
        priority
        fetchPriority="high"
        loading="eager"
        className="hero-image drop-shadow-[0_30px_70px_rgba(58,42,36,0.4)]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/35 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-parchment/80 to-transparent"></div>
    </header>
  );
};
