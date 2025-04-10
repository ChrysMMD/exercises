import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export default function Button({
  children,
  href,
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`
        inline-flex gap-2 items-center justify-center px-5 py-3 rounded-full text-white
        bg-[var(--color-pink)] 
        hover:bg-transparent hover:text-[var(--color-pink)] 
        hover:border hover:border-[var(--color-pink)] 
        active:scale-95 
        transition-all duration-300 ease-in-out
        ${className}
      `}
    >
      {children}
    </Link>
  );
}
