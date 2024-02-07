import Layout from "../ui/layout";
import { BackgroundImage } from "../ui/background-image";
import Image from "next/image";
import Link from "next/link";
export default function CharacterSheet() {
  return (
    <Layout>
      <div className="min-h-screen">
        <BackgroundImage
          altText="Background - a pencil drawing of a castle"
          imageSrc="https://d1ta48eu7x3n0t.cloudfront.net/character_sheet_background.webp"
        />
        <div className="items-center text-center">
          <h1 className="text-2xl font-bold mb-2">Character Sheet</h1>
          <Link
            href="/charactersheet.pdf"
            className="inline-block bg-amber-600 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3 mb-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </Link>
        </div>
        <Image
          src="https://d1ta48eu7x3n0t.cloudfront.net/character_sheet.jpg"
          alt="A photo of a scroll"
          className="mx-auto mb-4 lg:w-full w-screen object-contain border-4 border-black"
          priority
          width={400}
          height={400}
        />
      </div>
    </Layout>
  );
}
