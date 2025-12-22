import Layout from "../ui/layout";
import Image from "next/image";
export default function CharacterSheet() {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <a
          href={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/zalanthacharsheetv1.png`}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="group relative w-full"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/zalanthacharsheetv1.png`}
            alt="Zalantha character sheet"
            className="w-full rounded-[24px] border border-white/70 object-contain shadow-2xl"
            priority
            width={1600}
            height={1100}
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-[24px] bg-night/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="font-display text-sm uppercase tracking-[0.3em] text-mist">
              Download
            </span>
          </div>
        </a>
      </div>
    </Layout>
  );
}
