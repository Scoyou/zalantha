import { Header } from "./ui/header";
import Card from "./ui/card";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <main>
      <div className="bg-mapParchment">
        <Header />
        <div className="w-full md:w-3/4 mx-auto my-4 border -mt-12 bg-white relative z-30">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-center md:space-y-0 md:space-x-4">
            <div className="w-full md:w-auto">
              <Card
                imageUrl={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/rules_background.webp`}
                title="Rules"
                subText="The rules of the game are as follows..."
                buttonText="Read More"
                buttonHref="/rules"
              />
            </div>
            <div className="w-full md:w-auto">
              <Card
                imageUrl={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/history_thumbnail.webp`}
                title="World History"
                subText="This is the creation story of the world in which our LARPing adventure takes place..."
                buttonText="Read More"
                buttonHref="/history"
              />
            </div>
            <div className="w-full md:w-auto">
              <Card
                imageUrl={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/zalantha_map.jpeg`}
                title=" Races and Factions"
                subText="The Races and factions that populate the realm of Zalantha..."
                buttonText="Read More"
                buttonHref="/factions"
              />
            </div>
          </div>
        </div>
        <div className="w-3/4 mx-auto text-center">
          <h1 className="text-lg font-bold">About Us</h1>
          <p>
            We are a high-fantasy Live Action Role Play (LARP) game based in
            Davis County, Utah. What is LARP? Well, I&apos;m here to tell you.
            Did you ever play pretend when you were younger? Did you pretend to
            be a ninja, knight, or maybe even pretend to fight monsters? LARP is
            like that, but for adults and with some rules. It&apos;s almost like
            playing a roleplaying game, but you become the character. Have you
            ever played D&D and wanted to do more than just roll the dice? With
            LARP, you can do just that.
          </p>
          <Link
            href={"/get-started"}
            className="inline-block bg-amber-600 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="relative mt-4 h-[40rem]">
        <div className="absolute inset-0 z-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/header_image.webp`} // The path to your image
            alt="Background"
            layout="fill"
            objectFit="cover" // This ensures the image covers the div area without stretching.
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-[#FAF8F5] opacity-25"></div>{" "}
        <div className="relative z-20 p-4 bg-parchment bg-opacity-50">
          <h1 className="text-lg font-bold">Upcoming Events</h1>
          <p>Stay tuned for events coming up in 2025!</p>
        </div>
      </div>
    </main>
  );
}
