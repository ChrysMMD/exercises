import Image from "next/image";
import TextSection from "../components/TextSection";
import Galleri from "../components/Galleri";

export default function IWatchPage() {
  return (
    <>
      <div className="col-span-1">
        <TextSection />
      </div>

      <div className="col-span-1 row-span-2">
        <Galleri />
      </div>
    </>
  );
}
