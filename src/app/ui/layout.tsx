import Image from "next/legacy/image";
import { BackgroundImage } from "../ui/background-image";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col p-4 bg-parchment min-h-screen bg-opacity-40 relative">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center shadow-lg bg-amber-100 border border-amber-600 bg-opacity-70 w-full md:w-3/4 p-4 space-y-4">
          {props.children}
        </div>
      </div>
    </div>
  );
}
