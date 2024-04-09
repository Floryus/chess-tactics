"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  title: string;
  href: string;
}

const Breadcrumbs = () => {
  const pathname = usePathname();
  const parts = pathname.split("/").filter((part) => part !== "");

  const breadcrumbs: BreadcrumbItem[] = parts.map((part, index) => ({
    title: part.charAt(0).toUpperCase() + part.slice(1),
    href: index === 0 ? "/home" : `/${parts.slice(0, index + 1).join("/")}`,
  }));

  return (

    <nav className="pr-4 flex items-center ">
      {parts.map((part, index) => {
        return (
          <Link key={index} href={`/${part.toLowerCase()}`}>
            {index === 0 ? part + " " : " > " + part}
          </Link>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
