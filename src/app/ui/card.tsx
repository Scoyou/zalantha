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
    <div className="theme-card group relative mx-auto h-[520px] w-11/12 max-w-sm overflow-hidden rounded-[28px] border border-white/60 bg-white/80 p-4 shadow-xl backdrop-blur md:w-[320px]">
      <div className="relative h-[45%] w-full overflow-hidden rounded-[22px]">
        <Image
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={imageUrl}
          alt="Card image"
          layout="fill"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent opacity-70"></div>
      </div>
      <div className="relative z-10 h-[55%] px-2 py-5">
        <div className="theme-card-body flex h-full flex-col justify-between rounded-[20px] bg-mist/80 p-5">
          <div>
            <div className="font-display text-xl tracking-wide text-ink theme-card-title">
              {title}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/80 theme-card-text">
              {subText}
            </p>
          </div>
          <button
            onClick={() => window.location.assign(buttonHref)}
            className="btn-primary text-sm uppercase tracking-[0.2em]"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
