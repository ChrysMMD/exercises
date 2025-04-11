import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faStar,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function FooterNav() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white shadow-lg py-3">
      <nav className="flex justify-around items-center">
        <Link href="/" className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faHome}
            size="sm"
            className="text-gray-600 hover:text-[var(--color-pink)] w-10 h-10"
          />
        </Link>
        <Link href="/favorites" className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faStar}
            size="sm"
            className="text-gray-600 hover:text-[var(--color-pink)] w-10 h-10"
          />
        </Link>
        <Link href="/messages" className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faEnvelope}
            size="sm"
            className="text-gray-600 hover:text-[var(--color-pink)] w-10 h-10"
          />
        </Link>
        <Link href="/profile" className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faUser}
            size="sm"
            className="text-gray-600 hover:text-[var(--color-pink)] w-10 h-10"
          />
        </Link>
      </nav>
    </footer>
  );
}
