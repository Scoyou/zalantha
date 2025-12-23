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
  const containerClasses = `theme-race-card flex flex-col ${invertedImagePos ? "md:flex-row-reverse" : "md:flex-row"} overflow-hidden rounded-[26px] border border-white/60 bg-white/80 shadow-xl backdrop-blur md:mt-6`;
  const imageClasses = `relative md:w-1/3 overflow-hidden rounded-t-[26px] ${
    invertedImagePos ? "md:rounded-none md:rounded-r-[26px]" : "md:rounded-none md:rounded-l-[26px]"
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
        <div className="absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-transparent"></div>
      </div>

      <div className="theme-race-body flex flex-col justify-center gap-3 bg-mist/80 p-6 md:w-2/3">
        <h2 className="font-display text-2xl text-ink theme-race-title">{title}</h2>
        <p className="text-sm leading-relaxed text-ink/80 theme-race-text">{content}</p>
      </div>
    </div>
  );
}

export default RaceCard;
