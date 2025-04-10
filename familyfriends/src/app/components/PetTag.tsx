// components/PetTag.tsx
type PetTagProps = {
  children: React.ReactNode;
  bgColor?: string;
};

export default function PetTag({
  children,
  bgColor = "bg-[var(--my-pink)]",
}: PetTagProps) {
  return (
    <span
      className={`inline-block text-[var(--color-darkgreen)] px-4 py-2 rounded-full text-sm font-medium ${bgColor}`}
    >
      {children}
    </span>
  );
}
