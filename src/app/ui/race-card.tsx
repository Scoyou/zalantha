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
  const containerClasses = `theme-race-card group flex flex-col ${
    invertedImagePos ? "md:flex-row-reverse" : "md:flex-row"
  } overflow-hidden rounded-[28px] border border-white/70 bg-white/75 shadow-[0_30px_80px_rgba(58,42,36,0.22)] backdrop-blur md:mt-6`;
  const imageClasses = `relative md:w-5/12 overflow-hidden rounded-t-[28px] ${
    invertedImagePos ? "md:rounded-none md:rounded-r-[28px]" : "md:rounded-none md:rounded-l-[28px]"
  }`;

  return (
    <div className={containerClasses}>
      <div className={imageClasses}>
        <Image
          src={imageUrl}
          alt={altText}
          width={200}
          height={200}
          layout="responsive"
          objectFit="cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent"></div>
      </div>

      <div className="theme-race-body flex flex-col justify-center gap-3 bg-[linear-gradient(140deg,rgba(255,255,255,0.92),rgba(245,236,222,0.85))] p-6 md:w-7/12 md:p-8">
        <h2 className="font-display text-2xl text-ink theme-race-title">{title}</h2>
        <p className="text-sm leading-relaxed text-ink/75 theme-race-text">{content}</p>
      </div>
    </div>
  );
}

export default RaceCard;
