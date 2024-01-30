import { Header } from './ui/header'
import Card from './ui/card'

export default function Home() {
  return (
    <main>
      <div className="bg-gray-200">
        <Header />
        <div className="w-full md:w-3/4 mx-auto my-4 border -mt-16 bg-white">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-center md:space-y-0 md:space-x-4">
            <div className="w-full md:w-auto">
              <Card
                imageUrl="https://cdn.midjourney.com/3036210f-ed9c-4ec5-a504-c32d08486081/0_3.webp"
                title="Rules"
                subText='The rules of the game are as follows...'
                buttonText="Read More"
                buttonHref='/rules' />
            </div>
            <div className="w-full md:w-auto">
              <Card
                imageUrl="https://cdn.midjourney.com/a1ecf1ad-2f69-40f1-bbe1-83b1b83f815c/0_0.webp"
                title="History"
                subText="This is the creation story of the world in which our LARPing adventure takes place..."
                buttonText="Read More"
                buttonHref='/history' />
            </div>
            <div className="w-full md:w-auto">
              <Card
                imageUrl="https://cdn.midjourney.com/83f3b9f2-00e3-4146-a58f-5d259a167f8f/0_3.webp"
                title="Factions"
                subText="The Races and factions that populate the realm of Zalanthia..."
                buttonText="Read More"
                buttonHref='/factions' />
            </div>
          </div>
        </div>
        <div className="items-center text-center">
          <h1>About Us</h1>
          <p>We are a high-fantasy Live Action Role Play (LARP) game based in Davis County, Utah</p>
        </div>
      </div>
    </main>
  );
}
