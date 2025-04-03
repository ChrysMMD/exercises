export default function Button({ text, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 bg-transparent border border-white rounded-full text-white transition-colors hover:bg-white hover:text-[var(--color-primary)]  ${className}`}
    >
      {text}
    </button>
  );
}
