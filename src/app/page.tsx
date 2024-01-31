import { Header } from "./ui/header";
import Card from "./ui/card";

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
        <div className="items-center text-center">
          <h1 className="text-lg font-bold">About Us</h1>
          <p>
            We are a high-fantasy Live Action Role Play (LARP) game based in
            Davis County, Utah
          </p>
        </div>
      </div>
    </main>
  );
}
