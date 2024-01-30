import { Header } from './ui/header'
import Card from './ui/card'
import { NavBar } from './ui/navbar';
export default function Home() {
  return (
    <main>
      <div className="bg-gray-200">
        <NavBar />
        <Header />
        <div className="mx-auto my-4 border w-3/4 -mt-16 bg-white">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-center md:space-y-0 md:space-x-4">
            <div className="w-full md:w-auto">
              <Card
                imageUrl="https://cdn.midjourney.com/83f3b9f2-00e3-4146-a58f-5d259a167f8f/0_3.webp"
                title="Rules"
                buttonText="Get Started" />
            </div>
            <div className="w-full md:w-auto">
              <Card
                imageUrl="https://cdn.midjourney.com/83f3b9f2-00e3-4146-a58f-5d259a167f8f/0_3.webp"
                title="History"
                buttonText="Get Started" />
            </div>
            <div className="w-full md:w-auto">
              <Card
                imageUrl="https://cdn.midjourney.com/83f3b9f2-00e3-4146-a58f-5d259a167f8f/0_3.webp"
                title="Factions"
                buttonText="Get Started" />
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
