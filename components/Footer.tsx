import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-between">
      <Link href="https://github.com/Floryus/chess-tactics">
        <span className="emoji">👾</span> GitHub
      </Link>
      <Link href="/imprint">
        <span className="emoji">📩</span> Imprint
      </Link>
    </footer>
  );
};
export default Footer;
