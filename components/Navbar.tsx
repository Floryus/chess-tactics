import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className=" flex flex-row items-center justify-between">
      {/* Title and Logo */}
      <div className="flex">
        {/* <Image
          src="/5569495.png"
          alt="Logo"
          width={60}
          height={60}
          className="mr-8"
        /> */}
        <div className="flex flex-col">
            <div className="flex items-center"> <span className="emoji" style={{ fontSize: "36px" }}>♟️</span>
            <div className="text-3xl text-white underline">Chess Tactics</div>
          </div>
          <Breadcrumbs />
        </div>
      </div>

      <div className="text-white">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link href="/login">Sign in</Link>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
