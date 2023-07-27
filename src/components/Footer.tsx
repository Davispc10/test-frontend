import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <p className="text-white text-center">
        Made with ❤️ by{" "}
        <Link
          href="https://github.com/jeffersondrs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-500"
        >
          Jefferson Santos
        </Link>
      </p>
    </footer>
  );
}
