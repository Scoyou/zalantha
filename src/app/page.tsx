import { Header } from "./ui/header";
import Card from "./ui/card";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <div className="bg-gray-200">
        <Header />
        <div className="w-full md:w-3/4 mx-auto my-4 border -mt-16 bg-white">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-center md:space-y-0 md:space-x-4">
            <div className="w-full md:w-auto">
              <Card
                imageUrl="https://zalantha-prod-public.s3.us-east-2.amazonaws.com/rules_background.webp"
                title="Rules"
                subText="The rules of the game are as follows..."
                buttonText="Read More"
                buttonHref="/rules"
              />
            </div>
            <div className="w-full md:w-auto">
              <Card
                imageUrl="https://zalantha-prod-public.s3.us-east-2.amazonaws.com/history_thumbnail.webp"
                title="History"
                subText="This is the creation story of the world in which our LARPing adventure takes place..."
                buttonText="Read More"
                buttonHref="/history"
              />
            </div>
            <div className="w-full md:w-auto">
              <Card
                imageUrl="https://zalantha-prod-public.s3.us-east-2.amazonaws.com/factions_thumbnail.webp"
                title="Factions"
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
      <div className="mt-4 bg-parchent">
        <h1 className="text-lg font-bold">Upcoming Events</h1>
      </div>
    </main>
  );
}
