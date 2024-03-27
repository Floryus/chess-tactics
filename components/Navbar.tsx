import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className=" flex flex-row items-center justify-between">
      <div className="flex">
        <div className="flex items-baseline">
          
          <Link href={"/"} style={{fontSize:"36px"}}>
            <span className="emoji">♟️</span>
            <span style={{textDecoration:"underline"}}>Chess Tactics</span>
            </Link>
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
