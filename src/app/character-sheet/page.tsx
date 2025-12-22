import Layout from "../ui/layout";
import { BackgroundImage } from "../ui/background-image";
import Image from "next/image";
import Link from "next/link";
export default function CharacterSheet() {
  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center text-center">
        <BackgroundImage
          altText="Background - a pencil drawing of a castle"
          imageSrc={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/character_sheet_background.webp`}
        />
        <h1 className="text-3xl text-ink">Character Sheet</h1>
        <div className="relative inline-block">
          <Link
            href="/charactersheet.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="group">
              <Image
                src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/character_sheet.jpg`}
                alt="A photo of a scroll"
                className="w-screen rounded-[24px] border border-white/60 object-contain shadow-2xl lg:w-full"
                priority
                width={400}
                height={400}
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-[24px] bg-night/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-display text-sm uppercase tracking-[0.3em] text-brass">
                  Download
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
