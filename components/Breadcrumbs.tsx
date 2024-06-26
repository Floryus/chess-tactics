"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Breadcrumbs = () => {
  const pathname = usePathname();
  const parts = pathname.split("/").filter((part) => part !== "");
  parts.forEach((part, index) => {
    parts[index] = part.charAt(0).toUpperCase() + part.slice(1);
  });
  return (
    <nav className="pr-4 flex items-center ">
      {parts.map((part, index) => {
        return (
          <>
            {index === 0 ? <></> : <div className="px-2">{" > "}</div>}
            <Link key={index} href={`/${part.toLowerCase()}`}>
              {part}
            </Link>
          </>
        );
      })}
    </nav>
  );
};
export default Breadcrumbs;
