import Layout from "../ui/layout";
import { BackgroundImage } from "../ui/background-image";
import Image from "next/image";
import Link from "next/link";
export default function CharacterSheet() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center text-center">
        <BackgroundImage
          altText="Background - a pencil drawing of a castle"
          imageSrc={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/character_sheet_background.webp`}
        />
        <h1 className="text-2xl font-bold mb-2">Character Sheet</h1>
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
                className="lg:w-full w-screen object-contain border-4 border-black"
                priority
                width={400}
                height={400}
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-bold">Download</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
