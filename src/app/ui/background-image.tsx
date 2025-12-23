import Image from "next/legacy/image";

export const BackgroundImage = ({
  altText,
  imageSrc,
  variant = "fixed",
  className = "",
}: {
  altText: string;
  imageSrc: string;
  variant?: "fixed" | "panel";
  className?: string;
}) => {
  const containerClasses =
    variant === "panel"
      ? "absolute inset-0 -z-10 h-full w-full overflow-hidden"
      : "fixed top-0 left-0 -z-10 h-full w-full";
  return (
    <div className={`${containerClasses} ${className}`}>
      <Image
        alt={altText}
        src={imageSrc}
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/40 to-night/10"></div>
    </div>
  );
};
