import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="relative h-screen w-full overflow-hidden hero-map">
      <div className="absolute inset-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/zalantha_map.jpeg`}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="Map of Zalantha"
          priority
          fetchPriority="high"
          loading="eager"
          className="hero-map__image"
        />
      </div>
      <div className="absolute inset-0 hero-map__wash"></div>
      <div className="absolute inset-0 hero-map__runes"></div>
      <svg
        className="hero-map__trail"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <path
            id="hero-trail-path"
            d="M 80 480 C 220 420 320 340 440 330 C 560 320 640 250 720 190 C 800 130 900 110 970 80"
            pathLength="1"
          />
          <mask id="hero-trail-mask-strong" maskContentUnits="userSpaceOnUse">
            <use href="#hero-trail-path" className="hero-map__trail-mask hero-map__trail-mask--strong" />
          </mask>
          <mask id="hero-trail-mask-faint" maskContentUnits="userSpaceOnUse">
            <use href="#hero-trail-path" className="hero-map__trail-mask hero-map__trail-mask--faint" />
          </mask>
        </defs>
        <use
          href="#hero-trail-path"
          className="hero-map__trail-steps hero-map__trail-steps--faint"
          mask="url(#hero-trail-mask-faint)"
          transform="translate(-4 -3)"
        />
        <use
          href="#hero-trail-path"
          className="hero-map__trail-steps hero-map__trail-steps--faint"
          mask="url(#hero-trail-mask-faint)"
          transform="translate(4 3)"
        />
        <use
          href="#hero-trail-path"
          className="hero-map__trail-steps"
          mask="url(#hero-trail-mask-strong)"
          transform="translate(-4 -3)"
        />
        <use
          href="#hero-trail-path"
          className="hero-map__trail-steps"
          mask="url(#hero-trail-mask-strong)"
          transform="translate(4 3)"
        />
        
      </svg>
      <div className="absolute inset-6 rounded-[36px] border border-white/40 shadow-[0_0_60px_rgba(217,163,155,0.25)] md:inset-10"></div>
      <div className="absolute inset-0 hero-map__vignette"></div>
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <Link href="#home-sections" className="sigil-reveal" aria-label="Jump to rules, history, and factions">
          <div className="sigil-reveal__seal"></div>
          <div className="sigil-reveal__ring"></div>
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/logojpg_no_bg.webp`}
            width={420}
            height={420}
            alt="Knights of Zalantha sigil"
            className="sigil-reveal__mark"
          />
          <div className="sigil-reveal__glint"></div>
        </Link>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-28 hero-map__fog"></div>
    </header>
  );
};
