
import Image from "next/image";
import Header from "./components/Header"
import TextSection from "./components/TextSection";
import Galleri from "./components/Galleri";

export default function Home() {
  return (
    <>
      <div className="rows-start-1 rows-span-1 col-start-1 col-span-2">
        <Header />
      </div>

      <div className="col-start-1 row-start-2 col-span-1 row-span-2">
        <TextSection />
      </div>

      <div className="col-start-2 row-start-2 row-span-3">
        <Galleri />
      </div>
    </>


  );
}
