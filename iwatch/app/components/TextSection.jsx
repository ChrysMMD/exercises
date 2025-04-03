import Button from "./Button";

export default function TextSection() {
  return (
    <section className="flex flex-col justify-center space-y-4">
      <h1 className="leading-tight text-white text-[4rem] font-bold mb-0">
        The Perfect Moment
      </h1>
      <h1 className="leading-tight text-white text-[4rem]">
        Between Past And Future
      </h1>
      <Button className="w-1/2" text="Bye Now" />
    </section>
  );
}
