import { ComingSoon } from "../ui/coming-soon";
import Image from "next/image";
export default function Factions() {
  return (
    <div className="flex flex-col p-4 bg-parchment min-h-screen">
      <div className="items-center text-center">
        <Image
          src="https://d1ta48eu7x3n0t.cloudfront.net/zalantha_map.jpeg"
          alt="A map of Zalantha"
          className="mx-auto mb-4 lg:w-2/5 lg:h-2/5 object-contain w-80 h-80"
          width={400}
          height={400}
        />

        <h1 className="text-2xl font-bold mb-2">
          Races and Factions of Zalantha
        </h1>
      </div>
      <ComingSoon />
    </div>
  );
}
